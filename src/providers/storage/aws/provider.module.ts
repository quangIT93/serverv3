import { Module } from "@nestjs/common";
import { AWSConfigService } from "src/config/storage/aws/config.service";
import { AWSService } from "src/services/aws/aws.service";


@Module({
    imports: [],
    providers: [AWSService, AWSConfigService],
    exports: [AWSService, AWSConfigService],

})

export class AWSModule { }