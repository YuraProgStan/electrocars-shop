import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";


export class CreateUserDto {
    @ApiProperty({
        example: "Sergiy", description: 'username'
    })
    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public username: string;

    @ApiProperty({
        example: "user@gmail.com", description: 'email'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;


    @ApiProperty({
        example: 'asd3425432', description: 'password'
    })
    @IsString()
    @Length(3,10)
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({
        example: '+380678543210', description: 'phone'
    })
    @IsString()
    @IsOptional()
    readonly phone: string;

    @ApiProperty({
        example: true, description: 'status'
    })
    @IsBoolean()
    @IsOptional()
    public status: boolean;

    @IsString()
    @IsOptional()
    public avatar: string;

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
