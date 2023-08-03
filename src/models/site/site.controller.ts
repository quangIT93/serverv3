import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

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
        }
    }
}