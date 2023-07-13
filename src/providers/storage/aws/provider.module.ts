import { Module } from "@nestjs/common";
import { AWSConfigModule } from "src/config/storage/aws/config.module";
import { AWSConfigService } from "src/config/storage/aws/config.service";
import { AWSService } from "src/services/aws/aws.service";


@Module({
    imports: [
        AWSConfigModule
    ],
    providers: [AWSService, AWSConfigService],
    exports: [AWSService],

})

export class AWSModule { }