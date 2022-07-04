import {Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {WheelService} from "./wheel.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";
import {CreateWheelDto} from "./dto/create-wheel.dto";

@Controller('wheel')
export class WheelController {
    constructor(private wheelService: WheelService) {
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
                        size: 18,
                        sizeUnits: 'inches',
                        image: 'sfsdf.png',
                        markup: 7000,
                        description: 'Tempest Wheels',
                        rangeRation: 0,
                        colorImg: [],

                    },
                    {
                        id: 2,
                        modelId:1,
                        brandId:1,
                        size: 19,
                        sizeUnits: 'inches',
                        image: 'sfsdf.png',
                        markup: 0,
                        description: 'Tempest Wheels',
                        rangeRation: -30,
                        colorImg: [],
                    }
                ]
        }
    })
    @Get()
    getAll(){
        return this.wheelService.getAllWheels()
    }


    @ApiOperation({summary: 'Create model'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                modelId:1,
                brandId:1,
                size: 18,
                sizeUnits: 'inches',
                image: 'sfsdf.png',
                markup: 7000,
                description: 'Tempest Wheels',
                rangeRation: 0,
                colorImg: [],
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
    create(@Body() createDto: CreateWheelDto,  @UploadedFile() file: Express.Multer.File){
        console.log(`file ${file.filename} uploaded`)
        try{
            return this.wheelService.createWheel(createDto, file)
        }
        catch (err){
            console.log(err)
        }
    }
}
