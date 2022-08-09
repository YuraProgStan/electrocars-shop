import {
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Min,
    ValidateNested
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { Type} from "class-transformer";
import {ProductOrderDto} from "./product-order.dto";


export class PostOrderDto {
    @ApiProperty({
        example: [{id:1, brand:'Tesla', name: 'Model S', price: 95840, color: 'blue', wheelSize: 19, interiorColor: 'black', quantity: 1 }], description: 'products'
    })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ProductOrderDto)
    products: ProductOrderDto[];


    @ApiProperty({
        example: "Sergiy Vasilenko", description: 'username'
    })
    @IsString()
    @Length(2,30)
    @IsNotEmpty()
    public username: string;

    @ApiProperty({
        example: 55000, description: 'total'
    })
    @IsNumber()
    @IsNotEmpty()
    public total: number;


    @ApiProperty({
        example: 'United States', description: 'country'
    })
    @IsString()
    @Length(3,30)
    @IsNotEmpty()
    public country: string;

    @ApiProperty({
        example: 'New York', description: 'city'
    })
    @IsString()
    @Length(3,20)
    @IsNotEmpty()
    public city: string;


    @ApiProperty({
        example: '30 Some street', description: 'streetAddress'
    })
    @IsString()
    @Length(3,20)
    @IsNotEmpty()
    public streetAddress: string;

    @ApiProperty({
        example: 25, description: 'appNumber'
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    public aptNumber: number;

    @ApiProperty({
        example: '10014', description: 'zip'
    })
    @IsString()
    @Length(3,10)
    @IsNotEmpty()
    public zip: string;

    @ApiProperty({
        example: '+380678543210', description: 'phone'
    })
    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @ApiProperty({
        example: "pending", description: 'status'
    })
    @IsString()
    @IsOptional()
    public status: string;


}