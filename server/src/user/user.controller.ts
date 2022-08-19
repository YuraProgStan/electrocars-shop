import {
    Body,
    Controller, Delete,
    Get,
    HttpCode,
    HttpStatus, Param, Patch, Post, UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {RoleGuard} from "../auth/jwt-auth-admin.guard";
import {Roles} from "../decorators/role-decorator";
import {RoleEnum} from "../config/configuration";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName} from "../utils/edit.file.name";
import {imageFileFilter} from "../utils/image.filter";
import {UpdateUserDto} from "./dto/update-user.dto";
import {createFormDataUserDto} from "./dto/create-formdata-user.dto";

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                [
                    {
                        id: 1,
                        username: 'Olga',
                        email: 'olga@gmail.com',
                        password: '1233333',
                        status: false,
                        avatar: 'http://somesite.com/images.jpg'
                    },
                    {
                        id: 2,
                        username: 'Sergiy',
                        email: 'serg@gmail.com',
                        password: '1233333',
                        status: false,
                        avatar: 'http://somesite.com/images.jpg'
                    }
                ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
// @Roles(RoleEnum.Admin)
// @UseGuards(AuthGuard, RoleGuard)
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Update user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'Olga',
                email: 'olga@gmail.com',
                city: 'NewYork',
                password: '1234567',
                role: 'USER',
                status: true
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Patch('/:id')
    // @UseGuards(AuthGuard )
    @UseInterceptors(
        FileInterceptor('avatar', {

            storage: diskStorage({
                destination: './images/avatars',
                filename: editFileName
            }),

            fileFilter: imageFileFilter, limits: {fileSize: 1024 * 1024}
        })
    )
    updateUser(
        @Body() updateDto: UpdateUserDto,
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File) {
        try {
            return this.userService.updateUser(updateDto, id, file);
        } catch (e) {
            console.log(e)
        }

    }


    @ApiOperation({summary: 'Create user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'Olga',
                email: 'olga@gmail.com',
                city: 'NewYork',
                password: '1234567',
                role: 'USER',
                status: true
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Post()
    // @UseGuards(AuthGuard )
    @UseInterceptors(
        FileInterceptor('avatar', {

            storage: diskStorage({
                destination: './images/avatars',
                filename: editFileName
            }),

            fileFilter: imageFileFilter, limits: {fileSize: 1024 * 1024}
        })
    )
    createUser(
        @Body() createDto: createFormDataUserDto,
        @UploadedFile() file: Express.Multer.File) {
        try {
            return this.userService.createUserFormData(createDto, file);
        } catch (e) {
            console.log(e)
        }

    }

    @ApiOperation({summary: 'Delete user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                username: 'Olga',
                email: 'olga@gmail.com',
                password: '1234567',
                status: true
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    // @Roles(RoleEnum.Admin)
    // @UseGuards(AuthGuard, RoleGuard)
    delete(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}