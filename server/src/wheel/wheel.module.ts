import { Module } from '@nestjs/common';
import { WheelController } from './wheel.controller';
import { WheelService } from './wheel.service';
import {PrismaModule} from "../core/prisma.module";
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [WheelController],
  providers: [WheelService, PrismaService],
  imports: [PrismaModule]
})
export class WheelModule {}
