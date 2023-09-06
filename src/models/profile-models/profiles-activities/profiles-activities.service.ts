import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesActivityDto } from './dto/create-profiles-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesActivity } from './entities/profiles-activity.entity';
import { UpdateProfilesActivityDto } from './dto/update-profiles-activity.dto';

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

  async findAll(id: string) {
    try {
      return await this.profilesActivityRepository.find({
        where: {
          accountId: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const query = this.profilesActivityRepository
        .createQueryBuilder('profiles_activities')
        .where(
          'profiles_activities.id IN (:...ids) AND profiles_activities.accountId = :accountId',
          {
            ids: idArray,
            accountId,
          },
        );

      const dataProfileActivities = await query.getMany();

      if (dataProfileActivities.length === 0) {
        throw new BadRequestException('Profile activities not found');
      }

      await this.profilesActivityRepository.remove(dataProfileActivities);

      return 'Profile activities records removed successfully';
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto : UpdateProfilesActivityDto) {
    try {
      
      const dataProfileActivity = await this.profilesActivityRepository.findOne({
        where: { id, accountId: dto.accountId },
      });

      if (!dataProfileActivity) {
        throw new BadRequestException('Profile activity not found');
      }

      return await this.profilesActivityRepository.save({
        ...dataProfileActivity,
        ...dto,
      });

    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, accountId: string) {
    try {
      const profilesActivity = await this.profilesActivityRepository.findOne({
        where: {
          id,
          accountId,
        },
      });

      if (!profilesActivity) {
        throw new Error('Profile Activity not found');
      }

      return await this.profilesActivityRepository.remove(profilesActivity);
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
