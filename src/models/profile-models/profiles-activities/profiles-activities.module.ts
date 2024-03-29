import { Module } from '@nestjs/common';
import { ProfilesActivitiesService } from './profiles-activities.service';
import { ProfilesActivitiesController } from './profiles-activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesActivity } from './entities/profiles-activity.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesActivity]),
    JwtAccessTokenModule
  ],
  controllers: [ProfilesActivitiesController],
  providers: [ProfilesActivitiesService],
  exports: [ProfilesActivitiesService]
})
export class ProfilesActivitiesModule {}
