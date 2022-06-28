import {Body, Controller, Get, Post, Query, Redirect, Render, Res} from '@nestjs/common';
import {AuthUserDto} from "./dto/auth-user.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ConfirmUserDto} from "./dto/confirm-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
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
    @Post('/registration')
    @Render('register')
    async registration(@Body() userDto: CreateUserDto) {
        console.log(userDto);
        const response = await this.authService.registration(userDto);
        return {name: response.name};
    }

    @Get('/confirm')
    public async searchStore(@Query() confirmDto: ConfirmUserDto, @Res() res) {
        await this.authService.confirm(confirmDto.token);
        res.status(302).redirect(`${process.env.CLIENT_API_URL}/login`);


    }

}
