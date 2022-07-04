import { Module } from '@nestjs/common';
import { ColorImgController } from './color-img.controller';
import { ColorImgService } from './color-img.service';
import {PrismaService} from "../core/prisma.service";
import {PrismaModule} from "../core/prisma.module";

@Module({
  controllers: [ColorImgController],
  providers: [ColorImgService, PrismaService],
  imports: [PrismaModule]
})
export class ColorImgModule {}
