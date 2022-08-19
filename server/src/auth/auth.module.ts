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
import {UserModule} from "../user/user.module";

@Module({
  imports: [JwtModule.register({}), MailModule, HttpModule,
    // forwardRef(() => OrderModule)
  ],
  providers: [AuthService, PrismaService, UserService,MailService],
  controllers: [AuthController],
  exports: [AuthService]

})
export class AuthModule {}
