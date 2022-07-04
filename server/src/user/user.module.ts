import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaModule} from "../core/prisma.module";
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController],
  imports: [PrismaModule]
})
export class UserModule {}
