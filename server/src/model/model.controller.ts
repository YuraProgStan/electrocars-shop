import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ModelService} from "./model.service";
import {CreateModelDto} from "./dto/create-model.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";
import {response} from "express";

@Controller('model')
export class ModelController {
    constructor(private modelService: ModelService) {
    }

    @ApiOperation({summary: 'Get all models'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                [
                    {
                        id: 1,
                        brandId:1,
                        name: 'Model-s',
                        image: 'sfsffsd.jpg',
                        description: 'Description about model',
                        range: 300,
                        rangeUnits: 'Range (est.)',
                        topSpeed: 250,
                        topSpeedUnits: 'mph',
                        topSpeedDesc: 'Top Speed',
                        acceleration: 3.1,
                        accelerationUnits: 'sec',
                        accelerationDesc: '0-60 mph',
                        price: 55000,
                        wheels: [],
                        interior: [],
                        colorImg: []
                    },
                    {
                        id: 2,
                        brandId:1,
                        name: 'Model 3',
                        image: 'sfsffsd.jpg',
                        description: 'Description about model',
                        range: 300,
                        rangeUnits: 'Range (est.)',
                        topSpeed: 250,
                        topSpeedUnits: 'mph',
                        topSpeedDesc: 'Top Speed',
                        acceleration: 4.2,
                        accelerationUnits: 'sec',
                        accelerationDesc: '0-60 mph',
                        price: 99000,
                        wheels: [],
                        interior: [],
                        colorImg: []
                    }
                ]
        }
    })
    @Get()
    getAll(){
        return this.modelService.getAllModels()
    }

    @ApiOperation({summary: 'Create model'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                brandId:1,
                name: 'Model-s',
                image: 'sfsffsd.jpg',
                description: 'Description about model',
                range: 300,
                rangeUnits: 'Range (est.)',
                topSpeed: 250,
                topSpeedUnits: 'mph',
                topSpeedDesc: 'Top Speed',
                acceleration: 3.1,
                accelerationUnits: 'sec',
                accelerationDesc: '0-60 mph',
                price: 55000,
                wheels: [],
                interior: [],
                colorImg: []

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
    create(@Body() createDto: CreateModelDto,  @UploadedFile() file: Express.Multer.File){
        console.log(`file ${file.filename} uploaded`)
        try{

            return this.modelService.createModel(createDto, file)
        }
        catch (err){
            console.log(err)
        }
    }


    @ApiOperation({summary: 'Get all models'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                    {
                        id: 1,
                        brandId:1,
                        name: 'Model-s',
                        image: 'sfsffsd.jpg',
                        description: 'Description about model',
                        range: 300,
                        rangeUnits: 'Range (est.)',
                        topSpeed: 250,
                        topSpeedUnits: 'mph',
                        topSpeedDesc: 'Top Speed',
                        acceleration: 3.1,
                        accelerationUnits: 'sec',
                        accelerationDesc: '0-60 mph',
                        price: 55000,
                        wheels: [],
                        interior: [],
                        colorImg: []
                    },

        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOneUserById(@Param('id') id: string) {
        return this.modelService.getOneById(id);
    }

}
