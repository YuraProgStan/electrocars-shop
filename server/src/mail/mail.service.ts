import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import { join } from 'path';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: CreateUserDto, token: string) {
        const url = `http://localhost:${process.env.PORT}/api/auth/confirm?token=${token}`;
try {
    await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: { // ✏️ filling curly brackets with content
            username: user.username,
            url,
        },
        attachments: [{
            path: join(__dirname, 'templates', 'logo.jpg'),
            filename: 'logo.jpg',
            // contentDisposition:"attachment"
            cid: 'logo'
        }]
    });
}catch (err) {
    console.log(err)
}
    }
}


