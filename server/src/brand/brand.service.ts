import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Brand} from "@prisma/client";
import {CreateBrandDto} from "./dto/create-brand.dto";

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
}
