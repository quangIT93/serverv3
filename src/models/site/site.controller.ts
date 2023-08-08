import { BadRequestException, Controller, Get, HttpStatus, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Language } from "src/common/enum";
import * as fs from 'fs';
import path from 'path'; 

@ApiTags('Site')
@Controller('site')
export class SiteController {
    constructor() {}

    @Get('jobs')
    getJobs() {
        return {
            data: {
                total: 74953,
            }
        };
    }

    // get languages

    @Get('languages')
    getLanguages(@Req() req: any) {

        const { lang } = req;

        const languagePaths = {
            [Language.EN]: '../../../src/languages/en.json',
            [Language.VI]: '../../../src/languages/vi.json',
            [Language.KO]: '../../../src/languages/ko.json'
        };

        const filePath = path.join(__dirname,  (languagePaths[(lang === 'vi') ? 'vi' : (lang === 'ko') ? 'ko' : 'en']));

        try {
            const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
            const jsonData = JSON.parse(data);
            
            return {
                statusCode: HttpStatus.OK,
                data: jsonData
            };
        } catch (error) {
            throw new BadRequestException('Error reading language file');
        }
    }
}
