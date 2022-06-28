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


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService,
                private prismaService: PrismaService, private mailService: MailService) {
    }

    async login(authDto: AuthUserDto) {
        const user = await this.validateUser(authDto);
        return this.generateTokenPair(user);
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

    async confirm(token: string) {
        try {
            const user = await this.jwtService.verify(token, {publicKey: process.env.SECRET_ACTION_KEY});

            const findUser = await this.prismaService.user.findFirst({where: {id: user.id}});
            if (findUser) {
                console.log('error')
            }
           await this.prismaService.user.update({
                where: {id: user.id},
                data: {
                    status: true
                }
            })
            const tokens = this.generateTokenPair(findUser);
            await this.createTokens(tokens, findUser.id)
        } catch (e) {
            console.log(e)
        }
    }

    async createTokens(tokensPair, userId) {
        console.log(tokensPair);
        return await this.prismaService.token.create({data: {...tokensPair, userId}})
    }


    generateTokenPair(user) {
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

    async getVerifiedUserId(jwt: string): Promise<string | null> {
        try {
            const token = jwt.split(' ')[1];
            const user = await this.jwtService.verify(token, {publicKey: process.env.SECRET_ACCESS_KEY});
            return user.name;
            //return user.role
        } catch (e) {
            console.log(e);
        }
    }


}
