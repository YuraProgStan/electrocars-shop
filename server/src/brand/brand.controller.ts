import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {BrandService} from "./brand.service";
import {CreateBrandDto} from "./dto/create-brand.dto";

@Controller('brand')
export class BrandController {
    constructor(private brandService: BrandService) {
    }
    @ApiOperation({summary: 'Get all users'})
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
create(@Body() brandDto:CreateBrandDto){
    return this.brandService.createBrand(brandDto)
}
}
