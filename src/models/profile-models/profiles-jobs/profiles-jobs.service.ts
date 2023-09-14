import { Injectable } from '@nestjs/common';
import { UpdateProfilesJobDto } from './dto/update-profiles-job.dto';
import { UpdateProfileJobsTransaction } from './transaction/update-profile-job.transaction';

@Injectable()
export class ProfilesJobsService {
  constructor(
    private readonly updateProfileJobsTransaction: UpdateProfileJobsTransaction,
  ) {}

  async update(updateProfilesJobDto: UpdateProfilesJobDto) {
    try {
      return await this.updateProfileJobsTransaction.run(updateProfilesJobDto);
    } catch (error) {
      throw error;
    }
  }
}
