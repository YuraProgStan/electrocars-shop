import {Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpStatus} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('--------------------')
        console.log(request.headers)
        console.log('--------------------')
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {

                throw new UnauthorizedException({message: 'user is not auth'})
            }

            const user = this.jwtService.verify(token, {publicKey: process.env.SECRET_ACCESS_KEY});

            request.user = user;
            return true
        } catch (err) {
            if(err.name === 'TokenExpiredError'){
                throw new UnauthorizedException({error:{message: 'user is not auth', status: 401, customCode: 401.1}})
            }
            throw new UnauthorizedException({error:{message: 'user is not auth', status: 401}})
        }
    }
}