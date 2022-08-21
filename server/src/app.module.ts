import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailModule } from './mail/mail.module';
import {ConfigModule} from "@nestjs/config";
import { BrandService } from './brand/brand.service';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { WheelModule } from './wheel/wheel.module';
import { InteriorModule } from './interior/interior.module';
import { ColorImgModule } from './color-img/color-img.module';
import configuration from './config/configuration';
import {ScheduleModule} from "@nestjs/schedule";
import { OrderModule } from './order/order.module';
import { UploadimageModule } from './uploadimage/uploadimage.module';
import { RemoveimageModule } from './removeimage/removeimage.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          load: [configuration],
      }),UserModule, AuthModule, MailModule, BrandModule, ModelModule, WheelModule, InteriorModule, ColorImgModule,
      ScheduleModule.forRoot(),
      OrderModule,
      UploadimageModule,
      RemoveimageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
