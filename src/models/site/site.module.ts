import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { GoogleMapProvider } from './google-map.provider';

@Module({
  controllers: [SiteController],
  providers: [SiteService, GoogleMapProvider],
  exports: [SiteService],
})
export class SiteModule {}
