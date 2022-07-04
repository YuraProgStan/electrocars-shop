import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Wheel} from "@prisma/client";
import fs from "fs";
import path from "path";
import {CreateWheelDto} from "./dto/create-wheel.dto";

@Injectable()
export class WheelService {
    constructor(private prismaService: PrismaService) {
    }
    getAllWheels(): Promise<Wheel[]> {
        return this.prismaService.wheel.findMany({})
    }


    async createWheel(dto: CreateWheelDto, file): Promise<Wheel> {
        const {brandId, modelId, size, markup, rangeRatio, ...others} = dto
        try {
            if(file){
                const imageName = file.filename;
                const data = {
                    ...others,
                    brandId: Number(brandId),
                    modelId: Number(modelId),
                    size: Number(size),
                    markup: Number(markup),
                    rangeRatio: Number(rangeRatio),
                    image: imageName
                };
                const wheel = await this.prismaService.wheel.create({
                    data
                })
                return wheel
            }
        } catch (err) {
            fs.unlink(path.join(__dirname, '..', '..', 'images', file.filename), (err)=>{
                if(err){
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
