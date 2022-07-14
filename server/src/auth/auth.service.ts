import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {UserService} from "../user/user.service";
import {AuthUserDto} from "./dto/auth-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {TokenUserDto} from "./dto/token-user.dto";
import {PrismaService} from "../core/prisma.service";
import {MailService} from "../mail/mail.service";
import {RefreshTokenUserDto} from "./dto/refresh-token-user.dto";
import {Cron} from "@nestjs/schedule";
import {HttpService} from "@nestjs/axios";
import {map, Observable} from "rxjs";
import {AxiosResponse} from 'axios'


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService,
                private prismaService: PrismaService, private mailService: MailService,
                private httpService: HttpService) {
    }

    async login(authDto: AuthUserDto) {
        const user = await this.validateUser(authDto);
        if (!user.status) {
            return {error: {message: `confirm your email on ${user.email}`}}
        }
        const tokenPair = this.generateTokenPair(user);
        try {
            const res = await this.prismaService.token.create({data: {userId: user.id, ...tokenPair}})
        } catch (e) {
            throw  new HttpException('something went wrong', HttpStatus.BAD_REQUEST)
        }
        delete user.password;
        return {...tokenPair, ...user}
    }

    async socialLoginToken(user, accessToken = null) {

        const tokenPair = this.generateTokenPair(user);
        try {
            const data = {userId: user.id, ...tokenPair}
            await this.prismaService.token.create({data})
            if (accessToken) {
                const data = {
                    userId: user.id,
                    accessToken: accessToken,
                }
                await this.prismaService.socialToken.create({data})
            }
        } catch (e) {
            throw  new HttpException('something went wrong', HttpStatus.BAD_REQUEST)
        }
        delete user.password;
        return {...tokenPair, ...user}
    }

    async registration(userDto: CreateUserDto) {
        const findUser = await this.userService.getUserByEmail(userDto.email);
        if (findUser) {
            throw  new HttpException('user is already exist', HttpStatus.BAD_REQUEST)
        }

        try {
            const hashPass = await bcrypt.hash(userDto.password, 7);
            const user = await this.userService.createUser({...userDto, password: hashPass});
            const token = this.generateActionToken(user);

            await this.mailService.sendUserConfirmation(user, token);
            return {username: user.username};
        } catch (err) {
            return {username: err};
        }

    }

    async confirm(token: string, res) {
        try {
            const user = await this.jwtService.verify(token, {publicKey: process.env.SECRET_ACTION_KEY});

            const findUser = await this.prismaService.user.findFirst({where: {id: user.id}});
            if (!findUser) {
                res.status(302).redirect(`${process.env.CLIENT_API_URL}/registration`);
            }
            if (findUser.status) {
                res.status(302).redirect(`${process.env.CLIENT_API_URL}/login`);
            }
            await this.prismaService.user.update({
                where: {id: user.id},
                data: {
                    status: true
                }
            })
            res.status(302).redirect(`${process.env.CLIENT_API_URL}/login`);
        } catch (err) {
            console.log(err)
            res.status(302).redirect(`${process.env.CLIENT_API_URL}/registration`);
        }
    }

    async refresh(dto: RefreshTokenUserDto, user) {
        const tokenPair = this.generateTokenPair(user)
        try {
            await this.createTokens(tokenPair, user.id);
            await this.prismaService.token.deleteMany({
                where: {refreshToken: dto.refreshToken}
            })
        } catch (e) {
            new HttpException('something went wrong', HttpStatus.BAD_REQUEST)
        }

        return tokenPair;
    }

    async createTokens(tokensPair, userId) {
        return await this.prismaService.token.create({data: {...tokensPair, userId}})
    }


    private generateTokenPair(user) {
        const payload: TokenUserDto = {email: user.email, id: user.id, username: user.username, role: user.role};
        const accessToken = this.jwtService.sign(payload,
            {
                secret: process.env.SECRET_ACCESS_KEY as string,
                expiresIn: process.env.EXPIRES_IN_ACCESS
            });
        const refreshToken = this.jwtService.sign(payload,
            {
                secret: process.env.SECRET_REFRESH_KEY as string,
                expiresIn: process.env.EXPIRES_IN_REFRESH
            });

        return {
            accessToken,
            refreshToken,
        };
    }

    private generateActionToken(user) {
        const payload = {email: user.email, id: user.id, username: user.username};
        const actionToken = this.jwtService.sign(payload,
            {
                secret: process.env.SECRET_ACTION_KEY as string,
                expiresIn: process.env.EXPIRES_IN_ACCESS
            });


        return actionToken;
    }

    private async validateUser(user: AuthUserDto) {
        const userDB = await this.userService.getUserByEmail(user.email);
        if (userDB.profileId && userDB.profile === 'google') {
            throw new UnauthorizedException({message: 'Wrong email, you are already used it for authorized with google. Status code 401'})
        }
        const passEqual = await bcrypt.compare(user.password, userDB.password);
        if (userDB && passEqual) {
            return userDB;
        }
        throw new UnauthorizedException({message: 'Wrong email or password status code 401'})
    }

    async getVerifiedUserRefresh(jwt: string): Promise<string | null> {
        try {
            const user = await this.jwtService.verify(jwt, {publicKey: process.env.SECRET_REFRESH_KEY});
            return user;
        } catch (err) {
            throw new UnauthorizedException({error: err})
        }
    }

    @Cron('0 0 */3 * *', { //every 3 days
        name: 'notifications',
        timeZone: 'Europe/Kiev',
    })
    private async changeActionTokenStatus() {
        let threeDays: number | string = Date.now() - (24 * 3 * 60 * 60 * 1000);
        threeDays = new Date(threeDays).toISOString();
        this.prismaService.token.updateMany({
            where: {
                AND: [
                    {
                        status: true,
                    },
                    {
                        createdAt: {
                            gte: threeDays,
                        },
                    },
                ],
                NOT: [{actionToken: null}]
            },
            data: {status: false}
        })
    }

    async verifyGoogleToken(googleClient, token) {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        return payload
    }

    findAllFacebook(url): Observable<any> {
        return this.httpService.get(url)
    }
}
