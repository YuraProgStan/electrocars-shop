import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Length, Min} from "class-validator";

export class ProductOrderDto {
    @ApiProperty({
        example: 1, description: 'id'
    })
    @IsNumber()
    @IsNotEmpty()
    public id: number;

    @ApiProperty({
        example: "Tesla", description: 'brand'
    })
    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public brand: string;

    @ApiProperty({
        example: "Model S", description: 'name'
    })
    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        example: 95840, description: 'price'
    })
    @IsNumber()
    @Min(10000)
    @IsNotEmpty()
    public price: number;

    @ApiProperty({
        example: "blue", description: 'color'
    })
    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public  color: string;

    @ApiProperty({
        example: 19, description: 'wheelsSize'
    })
    @IsNumber()
    @Min(14)
    @IsNotEmpty()
    public  wheelsSize: number;

    @ApiProperty({
        example: "black", description: 'interiorColor'
    })
    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public  interiorColor: string;

    @ApiProperty({
        example: 1, description: 'quantity'
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    public  quantity: number;
    // id: 1,
    //         brand: 'Tesla',
    //         name: 'Model S',
    //         image: 'tesla-model-s-front-blue-19-496daeeab69eb41cff06e0d35610331103.png',
    //         price: 95840,
    //         color: 'blue',
    //         wheelsSize: 19,
    //         interiorColor: 'black',
    //         quantity: 1,
}