

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

    async sendMailWithTemplate(pathFile: string, data: any) {
        return await this.sender.sendMail({
            to: data.to,
            subject: "Trải nghiệm miễn phí dịch vụ tuyển dụng mới nhất trên HiJob nhé bạn!",
            // context: data.context,
            template: pathFile,
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