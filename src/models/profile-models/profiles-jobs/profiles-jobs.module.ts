import { Module } from '@nestjs/common';
import { ProfilesJobsService } from './profiles-jobs.service';
import { ProfilesJobsController } from './profiles-jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesJob } from './entities/profiles-job.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { UpdateProfileJobsTransaction } from './transaction/update-profile-job.transaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesJob]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [ProfilesJobsController],
  providers: [ProfilesJobsService, UpdateProfileJobsTransaction],
  exports: [ProfilesJobsService],
})
export class ProfilesJobsModule {}
