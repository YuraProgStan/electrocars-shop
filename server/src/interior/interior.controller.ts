import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {InteriorService} from "./interior.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";
import {CreateWheelDto} from "../wheel/dto/create-wheel.dto";
import {CreateInteriorDto} from "./dto/create-interior.dto";
import {ColorEnum} from "../config/configuration";
import fs from "fs";
import path from "path";

@Controller('interior')
export class InteriorController {
    constructor(private interiorService: InteriorService) {
    }

    @ApiOperation({summary: 'Get all wheels'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                [
                    {
                        id: 1,
                        modelId:1,
                        brandId:1,
                        image: 'sfsdf.png',
                        markup: 0,
                        description: 'All Black',
                        color: 'black',
                        decor: 'Ebony Decor',

                    },
                    {
                        id: 2,
                        modelId:1,
                        brandId:1,
                        image: 'sfsdf.png',
                        markup: 2000,
                        description: 'Black and White',
                        color: 'white',
                        decor: 'Walnut Decor',
                    }
                ]
        }
    })
    @Get()
    getAll(){
        return this.interiorService.getAllInteriors()
    }


    @ApiOperation({summary: 'Create model'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                modelId:1,
                brandId:1,
                image: 'sfsdf.png',
                markup: 0,
                description: 'All Black',
                color: 'black',
                decor: 'Ebony Decor',
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
    create(@Body() createDto:  CreateInteriorDto,  @UploadedFile() file: Express.Multer.File){
        console.log(`file ${file.filename} uploaded`);
        try{
            return this.interiorService.createInterior(createDto, file)
        }
        catch (err){
            console.log(err)
        }
    }
}
