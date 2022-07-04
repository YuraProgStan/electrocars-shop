import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Interior} from "@prisma/client";
import fs from "fs";
import path from "path";
import {PrismaService} from "../core/prisma.service";
import {CreateInteriorDto} from "./dto/create-interior.dto";
import {ColorEnum} from "../config/configuration";

@Injectable()
export class InteriorService {
    constructor(private prismaService: PrismaService) {
    }

    getAllInteriors(): Promise<Interior[]> {
        return this.prismaService.interior.findMany({})
    }

    async createInterior(dto: CreateInteriorDto, file) {
        const {brandId, modelId, markup, ...others} = dto;
        try {
            if (file) {
                const imageName = file.filename;
                const data = {
                    ...others,
                    brandId: Number(brandId),
                    modelId: Number(modelId),
                    markup: Number(markup),
                    image: imageName,
                };
                const interior = await this.prismaService.interior.create({
                    data
                })
               return interior
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
