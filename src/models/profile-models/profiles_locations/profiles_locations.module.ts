import { Module } from '@nestjs/common';
import { ProfilesLocationsService } from './profiles_locations.service';
import { ProfilesLocationsController } from './profiles_locations.controller';

@Module({
  providers: [ProfilesLocationsService],
  controllers: [ProfilesLocationsController]
})
export class ProfilesLocationsModule {}
