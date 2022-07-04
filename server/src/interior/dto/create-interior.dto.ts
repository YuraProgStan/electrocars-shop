import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {ColorEnum} from "../../config/configuration";


export class CreateInteriorDto{
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
        example: "5000", description: 'markup'
    })
    @IsString()
    @IsNotEmpty()
    public markup: string

    @ApiProperty({
        example: "Description for interior", description: 'description'
    })
    @IsString()
    @IsNotEmpty()
    @Length(2,30)
    public description: string;


    @ApiProperty({
        example: "white", description: 'white or black or crem, depends on model'
    })
    @IsString()
    @Length(3,10)
    @IsNotEmpty()
    @IsEnum(ColorEnum)
    public color: ColorEnum;


    @ApiProperty({
        example: "Ebony Decor", description: 'decor'
    })
    @IsString()
    @Length(3,30)
    @IsOptional()
    public decor: string;

}