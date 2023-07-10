import { Module } from '@nestjs/common';
import { ProfilesExperiencesController } from './profiles_experiences.controller';
import { ProfilesExperiencesService } from './profiles_experiences.service';

@Module({
  controllers: [ProfilesExperiencesController],
  providers: [ProfilesExperiencesService]
})
export class ProfilesExperiencesModule {}
