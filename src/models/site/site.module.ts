import { Module } from "@nestjs/common";
import { SiteController } from "./site.controller";


@Module({
    controllers: [SiteController],
    providers: [],
})

export class SiteModule {}