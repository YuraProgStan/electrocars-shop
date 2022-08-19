import {IsBoolean, IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {IsFile} from "./isfile.decorator";


export class UpdateUserDto {
    @ApiProperty({
        example: "Sergiy", description: 'username'
    })
    @IsString()
    @Length(2,10)
    @IsOptional()
    public username: string;

    @ApiProperty({
        example: "user@gmail.com", description: 'email'
    })
    @IsString()
    @IsEmail()
    @IsOptional()
    public email: string;


    @ApiProperty({
        example: 'asd3425432', description: 'password'
    })
    @IsString()
    @Length(3,10)
    @IsOptional()
    readonly password: string;

    @ApiProperty({
        example: '+380678543210', description: 'phone'
    })
    @IsString()
    @IsOptional()
    readonly phone: string;

    @ApiProperty({
        example: 'true', description: 'status'
    })
    @IsString()
    @IsIn(["true", "false"])
    @IsOptional()
    public status: string;

    @IsFile({ mime: ['image/jpg', 'image/png']})
    @IsOptional()
    public avatar: any;

    @ApiProperty({
        example: 'google', description: 'profile'
    })
    @IsString()
    @IsOptional()
    public profile: string;

    @ApiProperty({
        example: '1', description: 'profileId'
    })
    @IsString()
    @IsOptional()
    public profileId: string;
}