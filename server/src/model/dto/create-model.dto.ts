import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateModelDto {
    @ApiProperty({
        example: "1", description: 'brandId'
    })
    @IsString()
    @IsNotEmpty()
    public brandId: string

    @ApiProperty({
        example: "Model S", description: 'name'
    })
    @IsString()
    @Length(2,20)
    @IsNotEmpty()
    public name: string;


    @ApiProperty({
        example: "Description for model", description: 'description'
    })
    @IsString()
    @Length(10,1000)
    @IsNotEmpty()
    public description: string;


    @ApiProperty({
        example: "300", description: 'range'
    })
    @IsString()
    @Length(1,10)
    @IsNotEmpty()
    public range: string;


    @ApiProperty({
        example: "Range (est.)", description: 'rangeUnits'
    })
    @IsString()
    @Length(1,10)
    @IsOptional()
    public rangeUnits: string;

    @ApiProperty({
        example: "200", description: 'topSpeed'
    })
    @IsString()
    @Length(1,5)
    @IsNotEmpty()
    public topSpeed: string;

    @ApiProperty({
        example: "mph", description: 'topSpeedUnits'
    })
    @IsString()
    @Length(1,10)
    @IsOptional()
    public topSpeedUnits: string;

    @ApiProperty({
        example: "Top Speed", description: 'topSpeedDesc'
    })
    @IsString()
    @Length(1,10)
    @IsOptional()
    public topSpeedDesc: string;

    @ApiProperty({
        example: "3.1", description: 'acceleration'
    })
    @IsString()
    @Length(1,5)
    @IsNotEmpty()
    public acceleration: string;

    @ApiProperty({
        example: "sec", description: 'accelerationUnits'
    })
    @IsString()
    @Length(1,10)
    @IsOptional()
    public accelerationUnits: string;

    @ApiProperty({
        example: "0-60 mph", description: 'accelerationDesc'
    })
    @IsString()
    @Length(1,10)
    @IsOptional()
    public accelerationDesc: string;

    @ApiProperty({
        example: "55000", description: 'price'
    })
    @IsString()
    @Length(1,10)
    @IsNotEmpty()
    public price: string;
}