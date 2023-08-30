import { CreateMailLoggerDto } from '../log/mail-logger/dto/create-mail-logger.dto';
import { MailLoggerService } from '../log/mail-logger/mail-logger.service';
import { MailService } from './../../services/mail/mail.service';
import { BadRequestException, Injectable } from "@nestjs/common";
import { AdsMailOptionsDto } from './dto/ads-mail-options.dto';

@Injectable()
export class AdminService {

    constructor(
        private readonly mailService: MailService,
        private readonly mailLoggerService: MailLoggerService
    ) { }

    async sendAdsMail(data: AdsMailOptionsDto[], accountId: string) {
        try {

            // create set of mail
            const mailSet = new Set();
            data.forEach((item) => {
                mailSet.add(item.to);
                item['subject'] = "Nền tảng tuyển dụng mới";
            });

            if (mailSet.size !== data.length) {
                throw new BadRequestException('Duplicate mail. Please check again');
            }

            await Promise.all(data.map(async (item) => {
                await this.mailService.sendMailWithTemplate("ads-mail.hbs", item);
            }));
            
            const mailLogger: CreateMailLoggerDto[] = data.map((item) => {
                return new CreateMailLoggerDto(accountId, item.to, "Promotion");
            });

            await this.mailLoggerService.create(mailLogger);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}