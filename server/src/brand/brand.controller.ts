import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {BrandService} from "./brand.service";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) {
    }

    @ApiOperation({summary: 'Get all brands'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                [
                    {
                        id: 1,
                        name: 'Tesla',
                    },
                    {
                        id: 2,
                        name: 'Nissan',
                    }
                ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.brandService.getAllBrands()
    }

    @Post()
    create(@Body() brandDto: CreateBrandDto) {
        return this.brandService.createBrand(brandDto)
    }

    @ApiOperation({summary: 'Update brand'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'Tesla',

            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    update(@Body() brandDto: UpdateBrandDto, @Param('id') id: string) {
        return this.brandService.updateBrand(brandDto, id)
    }

    @Delete('/:id')
    // @Roles(RoleEnum.Admin)
    // @UseGuards(AuthGuard, RoleGuard)
    delete(@Param('id') id: string) {
        return this.brandService.deleteBrand(id)
    }
}
