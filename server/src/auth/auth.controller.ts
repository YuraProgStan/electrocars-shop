import {
    Body,
    Controller,
    Get, HttpException, HttpStatus,
    Post,
    Query,
    Req,
    Res, UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {AuthUserDto} from "./dto/auth-user.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ConfirmUserDto} from "./dto/confirm-user.dto";
import {RefreshTokenUserDto} from "./dto/refresh-token-user.dto";
import {AuthGuard} from "./jwt-auth.guard";
import {UserService} from "../user/user.service";
import {OAuth2Client} from "google-auth-library";
import GoogleTokenDto from "./dto/google-token.dto";
import FacebookLoginDto from "./dto/facebook-login.dto";
import {HttpService} from "@nestjs/axios";
import {lastValueFrom} from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService, private httpService: HttpService) {
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
        const response = await this.authService.registration(userDto);

        return {username: response.username};
    }

    @Get('/confirm')
    public async searchStore(@Query() confirmDto: ConfirmUserDto, @Res() res) {
        await this.authService.confirm(confirmDto.token, res);
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

    @Post('/google')
    async authGoogle(@Body() dto: GoogleTokenDto) {
        const googleClient = new OAuth2Client({
            clientId: process.env.GOOGLE_CLIENT_ID
        });
        try {
            const payload = await this.authService.verifyGoogleToken(googleClient, dto.token);
            const newUser = await this.userService.createUser({
                username: payload.name,
                email: payload.email,
                avatar: payload.picture,
                profile: 'google',
                profileId: payload.sub,
                password: payload.family_name + process.env.GOOGLE_PASS
            })
            return await this.authService.socialLoginToken(newUser);

        } catch (err) {
            throw new UnauthorizedException({message: 'something went wrong with authorization from google'})
        }
    }

    @Post('/facebook')
    async authFacebook(@Body() dto: FacebookLoginDto) {
        const {userID, accessToken} = dto;
        let urlGraphFacebook = `https://graph.facebook.com/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
        const res = await this.authService.findAllFacebook(urlGraphFacebook);
        const checkResult = await (await lastValueFrom(res)).data;
        const {name, email, picture, id} = checkResult;
        const data = {
            username: name,
            email: email,
            avatar: picture.data.url,
            profile: 'facebook',
            profileId: id,
            password: name + process.env.FACEBOOK_PASS
        }
        const newUser = await this.userService.createUser(data)
        const result = await this.authService.socialLoginToken(newUser, accessToken);
        return result
    }
}