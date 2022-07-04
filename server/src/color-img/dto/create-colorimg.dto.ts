import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {AngleEnum, ColorEnum} from "../../config/configuration";

export class CreateColorImgDto{
    @ApiProperty({
        example: "1", description: 'brandId'
    })
    @IsString()
    @IsNotEmpty()
    public brandId: string

    @ApiProperty({
        example: "1", description: 'modelId'
    })
    @IsString()
    @IsNotEmpty()
    public modelId: string

    @ApiProperty({
        example: "1", description: 'wheelId'
    })
    @IsString()
    @IsNotEmpty()
    public wheelId: string


    @ApiProperty({
        example: "white", description: 'white or black or blue or red or grey'
    })
    @IsString()
    @Length(3,10)
    @IsNotEmpty()
    @IsEnum(ColorEnum)
    public name: ColorEnum;


    @ApiProperty({
        example: "front", description: 'angle'
    })
    @IsString()
    @Length(2,10)
    @IsEnum(AngleEnum)
    public angle: AngleEnum;
}