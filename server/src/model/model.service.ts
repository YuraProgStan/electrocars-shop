import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Model} from "@prisma/client"
import {CreateModelDto} from "./dto/create-model.dto";
import * as fs from "fs";
import * as path from "path";


@Injectable()
export class ModelService {
    constructor(private prismaService: PrismaService) {
    }

    getAllModels(): Promise<Model[]> {
        return this.prismaService.model.findMany({})
    }

    getOneById(userId: string): Promise<Model> {
        return this.prismaService.model.findUnique({
            where:{id:Number(userId)},
            include:{wheels:true, interior: true, colorImg: true}
        })
    }

    async createModel(dto: CreateModelDto, file): Promise<Model> {
        const {brandId, range, topSpeed, acceleration, price, ...others} = dto
        try {
            if(file){
                const imageName = file.filename;
                const data = {
                    ...others,
                    brandId: Number(brandId),
                    range: Number(range),
                    topSpeed: Number(topSpeed),
                    acceleration: Number(acceleration),
                    price: Number(price),
                    image: imageName
                };
            const model = await this.prismaService.model.create({
               data
            })
            return model
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
