import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Prisma, User} from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    async getAllUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany({});
    }

   async getById(userId): Promise<User>{
       const user =  await this.prismaService.user.findUnique({where: {id: userId}});
       delete user.password;
        return user
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
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
}