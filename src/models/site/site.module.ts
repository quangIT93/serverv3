import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { Client } from '@googlemaps/google-maps-services-js';

@Module({
  controllers: [SiteController],
  providers: [
    SiteService,
    {
      provide: 'GOOGLE_MAPS_CLIENT',
      useValue: new Client({}),
    },
  ],
})
export class SiteModule {}
