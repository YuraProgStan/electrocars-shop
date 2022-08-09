import {forwardRef, Module} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {PrismaService} from "../core/prisma.service";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, JwtService],
})
export class OrderModule {}
