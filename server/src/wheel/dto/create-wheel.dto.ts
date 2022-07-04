import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateWheelDto {
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
        example: "19", description: 'size wheels'
    })
    @IsString()
    @Length(1,10)
    @IsNotEmpty()
    public size: string


    @ApiProperty({
        example: "inch)", description: 'size units'
    })
    @IsString()
    @Length(1,10)
    @IsOptional()
    public sizeUnits: string;


    @ApiProperty({
        example: "5000", description: 'markup'
    })
    @IsString()
    @IsNotEmpty()
    public markup: string

    @ApiProperty({
        example: "Description for wheel", description: 'description'
    })
    @IsString()
    @Length(10,50)
    @IsNotEmpty()
    public description: string;

    @ApiProperty({
        example: "-30", description: 'rangeRatio for sum with range in model'
    })
    @IsString()
    @Length(1,10)
    @IsNotEmpty()
    public rangeRatio: string;

}