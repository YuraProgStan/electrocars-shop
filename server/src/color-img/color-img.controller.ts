import {Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ColorImgService} from "./color-img.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {CreateColorImgDto} from "./dto/create-colorimg.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";

@Controller('color-img')
export class ColorImgController {
    constructor(private colorImgService: ColorImgService) {
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                [
                    {
                        id: 1,
                        name: 'white',
                        brandId: 1,
                        modelId: 1,
                        wheelId: 1,
                        angle: 'front',
                        image: 'asgasgg.png'
                    },
                    {
                        id: 2,
                        name: 'black',
                        brandId: 1,
                        modelId: 1,
                        wheelId: 1,
                        angle: 'back',
                        image: 'asgasgg.png'
                    }
                ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(){
        return this.colorImgService.getAllColorsImg()
    }

    @ApiOperation({summary: 'Create colorImg'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'white',
                brandId: 1,
                modelId: 1,
                wheelId: 1,
                angle: 'front',
                image: 'asgasgg.png'
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(
        FileInterceptor('image',{
            storage: diskStorage({
                destination: './images',
                filename: editFileName
            }),

            fileFilter: imageFileFilter, limits: {fileSize: 1024*1024}})
    )
    create(@Body() createDto: CreateColorImgDto,  @UploadedFile() file: Express.Multer.File){
        return this.colorImgService.createColorImg(createDto, file)
    }
}
