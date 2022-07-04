import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import {PrismaModule} from "../core/prisma.module";
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [ModelController],
  providers: [ModelService, PrismaService],
  imports: [PrismaModule]
})
export class ModelModule {}
