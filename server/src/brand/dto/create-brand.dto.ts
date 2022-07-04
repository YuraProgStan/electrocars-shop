import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateBrandDto{
    @ApiProperty({
        example: "Tesla", description: 'brand'
    })
    @IsString()
    @Length(3,10)
    @IsNotEmpty()
    name: string
}