import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {ColorImg} from '@prisma/client'
import {CreateColorImgDto} from "./dto/create-colorimg.dto";
import fs from "fs";
import path from "path";
@Injectable()
export class ColorImgService {
    constructor(private prismaService: PrismaService) {
    }

    getAllColorsImg():Promise<ColorImg[]>{
        return this.prismaService.colorImg.findMany({})
    }

  async  createColorImg(dto: CreateColorImgDto, file):Promise<ColorImg>{
        const {brandId, modelId, wheelId, ...others} = dto;
        try {
            if (file) {
                const imageName = file.filename;
                const data = {
                    ...others,
                    brandId: Number(brandId),
                    modelId: Number(modelId),
                    wheelId: Number(wheelId),
                    image: imageName,
                };
                const colorImg = await this.prismaService.colorImg.create({
                    data
                })
                return colorImg
            }
        } catch (err) {
            fs.unlink(path.join(__dirname, '..', '..', 'images', file.filename), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(`file ${file.filename} deleted`)
            })

            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err,
            }, HttpStatus.FORBIDDEN);
        }
    }
}
