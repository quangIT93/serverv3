import { Injectable } from '@nestjs/common';
import { CreateProfilesJobDto } from './dto/create-profiles-job.dto';
import { UpdateProfilesJobDto } from './dto/update-profiles-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesJob } from './entities/profiles-job.entity';
import { UpdateProfileJobsTransaction } from './transaction/update-profile-job.transaction';

@Injectable()
export class ProfilesJobsService {
  constructor(
    @InjectRepository(ProfilesJob)
    private profilesJobRepository: Repository<ProfilesJob>,
    private readonly updateProfileJobsTransaction: UpdateProfileJobsTransaction,
  ) {}

  async createMany(createProfilesJobDto: CreateProfilesJobDto) {
    try {
      // create many

      const newProfilesJob = createProfilesJobDto.jobTypeId.map((jobTypeId) => {
        return {
          accountId: createProfilesJobDto.accountId,
          jobTypeId,
        };
      });

      return await this.profilesJobRepository.save(newProfilesJob);
    } catch (error) {
      throw error;
    }
  }

  async update(updateProfilesJobDto: UpdateProfilesJobDto) {
    try {
      return await this.updateProfileJobsTransaction.run(updateProfilesJobDto);
    } catch (error) {
      throw error;
    }
  }
}
