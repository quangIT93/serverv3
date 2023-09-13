import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesActivityDto } from './dto/create-profiles-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesActivity } from './entities/profiles-activity.entity';
import { UpdateProfilesActivityDto } from './dto/update-profiles-activity.dto';
import { DeleteProfilesActivityDto } from './dto/delete-profile-activity.dto';

@Injectable()
export class ProfilesActivitiesService {
  constructor(
    @InjectRepository(ProfilesActivity)
    private readonly profilesActivityRepository: Repository<ProfilesActivity>,
  ) {}
  async create(createProfilesActivityDto: CreateProfilesActivityDto) {
    try {
      const newProfilesActivityEntity = this.profilesActivityRepository.create(
        createProfilesActivityDto,
      );

      return await this.profilesActivityRepository.save(
        newProfilesActivityEntity,
      );
    } catch (error) {
      throw error;
    }
  }

  async removeAll(data: DeleteProfilesActivityDto) {
    try {
      // const idArray = ids;

      //  create set of ids to delete
      const idSet = new Set(data.ids);

      const result = await this.profilesActivityRepository.delete({
        id: In([...idSet]),
        accountId: data.accountId,
      });
      
      return result;

      // if (result && typeof result.affected === 'number' && ( result.affected === 0 || result.affected < idSet.size )) {
      //   throw new BadRequestException('Some profiles activity were not deleted');
      // }
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto: UpdateProfilesActivityDto) {
    try {
      return await this.profilesActivityRepository.update(
        {
          id,
          accountId: dto.accountId,
        },
        dto,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, accountId: string) {
    try {
      const profilesActivity = await this.profilesActivityRepository.findOne({
        where: {
          id,
          accountId,
        },
      });

      if (!profilesActivity) {
        throw new BadRequestException('Profile activity not found');
      }

      return profilesActivity;
    } catch (error) {
      throw error;
    }
  }
}
