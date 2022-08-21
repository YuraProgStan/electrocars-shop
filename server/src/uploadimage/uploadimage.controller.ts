import {Body, Controller, Delete, HttpCode, HttpStatus, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";
import {CreateModelDto} from "../model/dto/create-model.dto";

@Controller('uploadimage')
export class UploadimageController {
    @ApiOperation({summary: 'Upload Image'})
    @ApiOkResponse({
        status: 200
    })
    @HttpCode(HttpStatus.OK)
    @Post()
    @UseInterceptors(
        FileInterceptor(
            // 'UploadFiles',
            'file',
            {
            storage: diskStorage({
                destination: './images/uploads',
                filename: editFileName
            }),

            fileFilter: imageFileFilter, limits: {fileSize: 1024*1024}})
    )
    create( @Res({ passthrough: true }) res,  @UploadedFile() file: Express.Multer.File,){
        console.log('here')

        if (file) {
            const fileNameUrl = 'http://localhost:4000/uploads/' + file.filename;
            console.log(fileNameUrl);
            res.header("name", fileNameUrl);
            return {link: fileNameUrl};
        }
        //     return res.send({
        //         status: "OK",
        //         message: "File uploaded",
        //     });
        // } else {
        //     return  res.send({
        //         status: "BAD REQUEST",
        //         message: "File not found",
        //     });
        // }


    }

    // @ApiOperation({summary: 'Remove image'})
    // @ApiOkResponse({
    //     status: 200, schema: {
    //         example: 'uploads/atacams-c61ec33145bc7acfa794f5b8d010695dc.jpg'
    //     }
    // })
    // @HttpCode(HttpStatus.OK)
    //
    // @Delete()
    // remove(@Body() createDto) {
    //     try {
    //         console.log('remove')
    //         console.log(createDto)
    //         return "Ok"
    //
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
}
