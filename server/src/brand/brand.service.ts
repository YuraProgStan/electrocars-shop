import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Brand, User} from "@prisma/client";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";

@Injectable()
export class BrandService {
    constructor(private prismaService: PrismaService) {
    }

    async getAllBrands(): Promise<Brand[]> {
        return await this.prismaService.brand.findMany({});
    }

    async createBrand(data: CreateBrandDto): Promise<Brand> {
        try {
            return await this.prismaService.brand.create({data})
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err,
            }, HttpStatus.FORBIDDEN);
        }
    }

    async updateBrand(data: UpdateBrandDto, brandId): Promise<Brand> {
        try {

                const findBrand = await this.prismaService.brand.findFirst({where: {name: data.name}})
                if (findBrand) {
                    throw  new HttpException('brand is already exist', HttpStatus.BAD_REQUEST)
                }

            const brand = await this.prismaService.brand.update({
                where: {id: Number(brandId)},
                data
            })
            return brand
        } catch (err) {
            console.log(err);
        }

    }

    async deleteBrand(brandId: string): Promise<Brand> {
        return await this.prismaService.brand.delete({
            where: {id: Number(brandId)},
        })
    }
}
