import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Prisma,User} from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    getAll(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    async  createUser(data: Prisma.UserCreateInput): Promise<User> {
        const findUser = await this.getUserByEmail(data.email);
        if (findUser) {
            throw  new HttpException('user is already exist', HttpStatus.BAD_REQUEST)
        }
        return await this.prismaService.user.create({data})
    }

    getUserByEmail(userEmail: string): Promise<User>{
        return this.prismaService.user.findFirst({
            where: {email: userEmail}
        })
    }
}