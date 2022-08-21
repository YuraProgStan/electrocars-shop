import {Body, Controller, Delete, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";
import * as fs from 'fs';
import {RemoveimageService} from "./removeimage.service";

@Controller('removeimage')
export class RemoveimageController {
    constructor(private removeimageService: RemoveimageService) {
    }
    @ApiOperation({summary: 'Remove image'})
    @ApiOkResponse({
        status: 200, schema: {
            example: 'uploads/atacams-c61ec33145bc7acfa794f5b8d010695dc.jpg'
        }
    })
    @HttpCode(HttpStatus.OK)

    @Post()
    // @UseInterceptors(
    //     FileInterceptor('UploadFiles'
    //     )
    // )
    remove(
        // @UploadedFile() file: Express.Multer.File
        @Body() createDto
    ) {
        try {
            console.log(createDto)
            const arr = createDto.src.split('/');
            const findArr = arr.slice(-2);
            const path = findArr.join('/');
           return  this.removeimageService.removeImage(path)


        } catch (err) {
            console.log('not exist')
            console.log(err)
        }
    }
}
