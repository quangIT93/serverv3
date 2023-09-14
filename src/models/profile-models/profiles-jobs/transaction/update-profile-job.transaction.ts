import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { ProfilesJob } from '../entities/profiles-job.entity';
import { UpdateProfilesJobDto } from '../dto/update-profiles-job.dto';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UpdateProfileJobsTransaction extends BaseTransaction<
  UpdateProfilesJobDto,
  ProfilesJob
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    updateProfilesJobDto: UpdateProfilesJobDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      if (updateProfilesJobDto.jobTypeId) {
        await manager.delete(ProfilesJob, {
          accountId: updateProfilesJobDto.accountId,
        });

        const newProfilesJob = manager.create(ProfilesJob, {
          ...updateProfilesJobDto,
        });

        return await manager.save(ProfilesJob, newProfilesJob);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error updating profile jobs');
    }
  }
}
