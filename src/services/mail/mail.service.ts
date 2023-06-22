

/**
 * Mail service
 * 
 * @class
 */

import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private sender: MailerService) { }

    async sendUserConfirmation(email: string) {
        await this.sender.sendMail({
            to: email,
            subject: "Welcome to NestJS Boilerplate",
            context: {
                email,
            },
            html: "<h1>Welcome to NestJS Boilerplate</h1>",
        });
    }

    async sendMail(data: any) {
        await this.sender.sendMail({
            to: data.to,
            subject: data.subject,
            context: data.context,
            html: data.html,
        });
    }

    async sendMailTest(to: string) {
        await this.sender.sendMail({
            to: to,
            subject: "Welcome to NestJS Boilerplate",
            context: {
                email: to,
            },
            html: "<h1>Welcome to NestJS Boilerplate</h1>",
        });
    }
}