import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import {PrismaService} from "../core/prisma.service";
import {BrandService} from "./brand.service";
import {PrismaModule} from "../core/prisma.module";

@Module({
  controllers: [BrandController],
  providers: [BrandService,PrismaService],
  imports: [PrismaModule]
})
export class BrandModule {}
