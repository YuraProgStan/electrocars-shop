import {
    IsEmail,
    IsEnum,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    NotEquals
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {IsFile} from "./isfile.decorator";
import {RoleEnum} from "../../config/configuration";


export class createFormDataUserDto {
    @ApiProperty({
        example: "Sergiy", description: 'username'
    })
    @IsString()
    @Length(2,20)
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

    @IsString()
    @IsIn(["true", "false"])
    @IsOptional()
    public status: string;

    @IsString()
    @IsEnum(RoleEnum)
    @NotEquals(RoleEnum[RoleEnum.Client])
    @IsOptional()
    public role: string;

    @IsFile({ mime: ['image/jpg', 'image/png']})
    @IsOptional()
    public avatar: any;


}
