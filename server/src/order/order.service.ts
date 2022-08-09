import {Injectable} from '@nestjs/common';
import {OrderStatusEnum} from "../config/configuration";
import {PrismaService} from "../core/prisma.service";
import {Order} from "@prisma/client"

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {
    }

    async createOrder(dto, userId):Promise<Order> {
        let currentNumber;
        const maxNumber = await this.prismaService.order.findFirst({
            orderBy: [
                {
                    orderNumber: 'desc'
                }
            ],
            select: {
                orderNumber: true
            }
        })
        if (!maxNumber) {
            currentNumber = 'ECR1'
        } else {
            currentNumber = 'ECR' + (Number(maxNumber.orderNumber.slice(3)) + 1);
        }
        const data = {
            orderNumber: currentNumber,
            userId: userId,
            username: dto.username,
            total: dto.total,
            country: dto.country,
            city: dto.city,
            streetAddress: dto.streetAddress,
            aptNumber: dto.aptNumber,
            zip: dto.zip,
            status: OrderStatusEnum.pending,
        }
        const order = await this.prismaService.order.create({
            data
        });

        const createManyOrderProducts = dto.products.map( (product) =>
            this.prismaService.orderProduct.create({
                data: {
                    orderId: order.id,
                    productId: product.id,
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    color: product.color,
                    wheelsSize: product.wheelsSize,
                    interiorColor: product.interiorColor,
                    quantity: product.quantity
                },
            }),
        );
        await Promise.all(createManyOrderProducts);

        return order
    }
}


