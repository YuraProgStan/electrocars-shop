import {BadRequestException, Injectable} from '@nestjs/common';

@Injectable()
export class GoogleService {
    googleLogin(req) {
        if (!req.user) {
            throw new BadRequestException();
        }
console.log('________')
console.log(req.user)
console.log('________')
        return {
            message: 'User information from google',
            user: req.user
        }
    }
}
