import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Service dealing with app config based operations.
 * 
 * @class
 */

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get name(): string | undefined {
        return this.configService.get<string>('app.name')
    }

    get env(): string | undefined {
        return this.configService.get<string>('app.env')
    }

    get url(): string | undefined {
        return this.configService.get<string>('app.url')
    }

    get port(): number | undefined {
        return this.configService.get<number>('app.port')
    }

    get mode(): string | undefined {
        return this.configService.get<string>('app.mode')
    }    
}