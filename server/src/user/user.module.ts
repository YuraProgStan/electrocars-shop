import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaModule} from "../core/prisma.module";
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../auth/auth.service";
import {MailService} from "../mail/mail.service";
import {AuthModule} from "../auth/auth.module";
import {MailModule} from "../mail/mail.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [ HttpModule],
  providers: [UserService, PrismaService, JwtService, AuthService, MailService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
