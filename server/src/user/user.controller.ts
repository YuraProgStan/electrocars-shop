import { Controller } from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('users')
@Controller('user')
export class UserController {private userService: UserService}


