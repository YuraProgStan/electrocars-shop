import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Prisma, User} from '@prisma/client';
import {AuthService} from "../auth/auth.service";
import {MailService} from "../mail/mail.service";
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService,
                @Inject(forwardRef(() => AuthService))
                private authService: AuthService,
                private mailService: MailService) {
    }

    async getAllUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany({});
    }

    async getById(userId): Promise<User> {
        const user = await this.prismaService.user.findUnique({where: {id: userId}});
        delete user.password;
        return user
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        if (data.profileId) {
            const findSocialUser = await this.getUserByProfileId(data.profileId);
            if (findSocialUser) {
                return findSocialUser;
            }
        }
        const findUser = await this.getUserByEmail(data.email);
        if (findUser) {
            throw  new HttpException('user is already exist', HttpStatus.BAD_REQUEST)
        }

        const user = await this.prismaService.user.create({data});
        delete user.password
        return user
    }

    getUserByEmail(userEmail: string): Promise<User> {
        return this.prismaService.user.findFirst({
            where: {email: userEmail}
        })
    }

    getUserByProfileId(profileId: string): Promise<User> {
        return this.prismaService.user.findFirst({
            where: {profileId: profileId}
        })
    }

    async updateUser(userData, userId: string, file) {
        const getStringStatus = userData.status;
        const findData = {...await this.validateFormData(userData)}
        try {
            const data = this.makeData(findData, file);
            const user = await  this.prismaService.user.update({
                where: {id: Number(userId)},
                data
            })
            console.log('getStringStatus =', getStringStatus)
            if(getStringStatus === "false" && !user.status){
                const token = this.authService.generateActionToken(user);
                await this.mailService.sendUserConfirmation(user, token);
            }
            return user;
        } catch (err) {
            console.log(err)
        }
    }


    async createUserFormData(userData, file){
        const findData = {...await this.validateFormData(userData)}
        try {
            const data = this.makeData(findData, file);
            console.log('data',data)
            const user = await  this.prismaService.user.create({
                data
            })
            if(!user.status){
                const token = this.authService.generateActionToken(user);
                await this.mailService.sendUserConfirmation(user, token);
            }
            console.log('user',user);
            return user;
        } catch (err) {
            console.log(err)
        }
    }
    async deleteUser(userId: string): Promise<User> {
        return await this.prismaService.user.delete({
            where: {id: Number(userId)},
        })
    }
    async validateFormData(userData){
        if (userData.email) {
            const findUser = await this.getUserByEmail(userData.email);
            if (findUser) {
                throw  new HttpException('user is already exist', HttpStatus.BAD_REQUEST)
            }
        }
        if(userData.status){
            userData.status  = !!JSON.parse(userData.status);
        }
        if(userData.role){
            switch (userData.role){
                case 'USER':
                    userData.role = Role.USER;
                    break
                case 'ADMIN':
                    userData.role = Role.ADMIN;
                    break
                default:
                    userData.role = Role.USER;
            }
        }
        if(userData.password){
            userData.password = this.authService.hashPassword(userData.password);
        }
        return userData;
    }
    makeData(findData, file) {
        let data;
        if (file) {
            // const avatarPath = await this.fileUploadAwsService.upload(file, 'avatar', userId) //aws
            // const avatarPath = await this.fileUploadCloudinaryService.upload(file, 'avatar', userId); //cloudinary
            const avatarPath = file.filename //server
            console.log(avatarPath);
            data = {
                ...findData, avatar: avatarPath,
            }
            console.log('data', data);

        } else {
            data = {
                ...findData
            }
        }
        return data
    }
}