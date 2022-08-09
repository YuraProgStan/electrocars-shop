import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {PostOrderDto} from "./dto/post-order.dto";
import {OrderService} from "./order.service";
import {AuthGuard} from "../auth/jwt-auth.guard";

@Controller('order')
export class OrderController {
constructor(private orderService: OrderService) {
}
    @UseGuards(AuthGuard)
    @Post()
    create(@Req() req,@Body() dto: PostOrderDto){
        try{
            return this.orderService.createOrder(dto,req.user.id)
        }
        catch (err){
            console.log(err)
        }
    }
}
