import {
    Body, ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    Redirect,
    Render,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthUserDto} from "./dto/auth-user.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ConfirmUserDto} from "./dto/confirm-user.dto";
import {RefreshTokenUserDto} from "./dto/refresh-token-user.dto";
import {AuthGuard} from "./jwt-auth.guard";
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {
    }

    @ApiOperation({summary: 'Login user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                token: 'Bearer 235432dsf/afsdffa'
            }
        }
    })
    @Post('/login')
    login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto)
    }

    @ApiOperation({summary: 'Registration user'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                token: 'Bearer 235432dsf/afsdffa'
            }
        }
    })
    @Post('/register')
    async registration(@Body() userDto: CreateUserDto) {
        console.log(userDto);
        const response = await this.authService.registration(userDto);
       
        return {username: response.username};
    }

    @Get('/confirm')
    public async searchStore(@Query() confirmDto: ConfirmUserDto, @Res() res) {
        await this.authService.confirm(confirmDto.token,res);
    }

    @Post('/refresh')
    async refresh(@Body() userDto: RefreshTokenUserDto,) {
        const user = await this.authService.getVerifiedUserRefresh(userDto.refreshToken);
        return await this.authService.refresh(userDto, user);
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    async me(@Req() req) {
        return await this.userService.getById(req.user.id);
    }

}
