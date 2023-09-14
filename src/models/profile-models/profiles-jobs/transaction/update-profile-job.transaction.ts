import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { ProfilesJob } from '../entities/profiles-job.entity';
import { UpdateProfilesJobDto } from '../dto/update-profiles-job.dto';
import { DataSource, EntityManager, In } from 'typeorm';

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
      if (updateProfilesJobDto.ids && updateProfilesJobDto.ids.length > 0) {
        const idSet = new Set(updateProfilesJobDto.ids);

        const result = await manager.delete(ProfilesJob, {
          id: In([...idSet]),
          accountId: updateProfilesJobDto.accountId,
        });

        if (result.affected === 0 || result.affected !== updateProfilesJobDto.ids.length) {
            throw new BadRequestException('Error updating profile jobs');
        }   
      }

      if (
        updateProfilesJobDto.jobTypeId &&
        updateProfilesJobDto.jobTypeId.length > 0
      ) {
        const newProfilesJob = updateProfilesJobDto.jobTypeId.map(
          (jobTypeId) => {
            return {
              accountId: updateProfilesJobDto.accountId,
              jobTypeId,
            };
          },
        );

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
