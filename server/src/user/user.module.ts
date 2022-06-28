import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaModule} from "../core/prisma.module";
import {PrismaService} from "../core/prisma.service";

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [PrismaModule]
})
export class UserModule {}
