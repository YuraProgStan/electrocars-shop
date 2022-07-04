import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {UserService} from "../user/user.service";
import {AuthUserDto} from "./dto/auth-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "@prisma/client";
import {TokenUserDto} from "./dto/token-user.dto";
import {PrismaService} from "../core/prisma.service";
import {MailService} from "../mail/mail.service";
import {RefreshTokenUserDto} from "./dto/refresh-token-user.dto";


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService,
                private prismaService: PrismaService, private mailService: MailService) {
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
            return {name: user.name};
        } catch (err) {
            console.log(err);
            return {name: err};
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
        const payload: TokenUserDto = {email: user.email, id: user.id, name: user.name, role: user.role};
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
        const payload = {email: user.email, id: user.id, name: user.name};
        const actionToken = this.jwtService.sign(payload,
            {
                secret: process.env.SECRET_ACTION_KEY as string,
                expiresIn: process.env.EXPIRES_IN_ACCESS
            });


        return actionToken;
    }

    private async validateUser(user: AuthUserDto) {
        const userDB = await this.userService.getUserByEmail(user.email);
        const passEqual = await bcrypt.compare(user.password, userDB.password);
        if (userDB && passEqual) {
            return userDB;
        }
        throw new UnauthorizedException({message: 'wrong email or password'})
    }

    async getVerifiedUserRefresh(jwt: string): Promise<string | null> {
        try {
            const user = await this.jwtService.verify(jwt, {publicKey: process.env.SECRET_REFRESH_KEY});
            return user;
        } catch (err) {
            throw new UnauthorizedException({error: err})
        }
    }

    // async getVerifiedUserId(jwt: string): Promise<string | null> {
    //     try {
    //         const token = jwt.split(' ')[1];
    //         const user = await this.jwtService.verify(token, {publicKey: process.env.SECRET_ACCESS_KEY});
    //         return user.name;
    //         //return user.role
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


}
