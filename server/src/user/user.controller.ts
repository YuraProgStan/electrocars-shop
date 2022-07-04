import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {RoleGuard} from "../auth/jwt-auth-admin.guard";
import {Roles} from "../decorators/role-decorator";
import {RoleEnum} from "../config/configuration";

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
                    name: 'Olga',
                    email: 'olga@gmail.com',
                    password: '1233333',
                    status: false,
                    avatar: 'http://somesite.com/images.jpg'
                },
                {
                    id: 2,
                    name: 'Sergiy',
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
@Roles(RoleEnum.Admin)
@UseGuards(AuthGuard, RoleGuard)
getAll() {
    return this.userService.getAllUsers()
}
}