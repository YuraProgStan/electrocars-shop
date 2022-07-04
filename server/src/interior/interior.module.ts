import { Module } from '@nestjs/common';
import { InteriorController } from './interior.controller';
import { InteriorService } from './interior.service';
import {PrismaModule} from "../core/prisma.module";
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [InteriorController],
  providers: [InteriorService, PrismaService],
  imports: [PrismaModule]
})
export class InteriorModule {}
