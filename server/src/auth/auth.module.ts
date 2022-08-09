import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {PrismaService} from "../core/prisma.service";
import {MailService} from "../mail/mail.service";
import {MailModule} from "../mail/mail.module";
import {HttpModule} from "@nestjs/axios";
import {OrderModule} from "../order/order.module";

@Module({
  providers: [AuthService, UserService, PrismaService, MailService],
  controllers: [AuthController],
imports: [JwtModule.register({}), MailModule, HttpModule,
  // forwardRef(() => OrderModule)
],
})
export class AuthModule {}
