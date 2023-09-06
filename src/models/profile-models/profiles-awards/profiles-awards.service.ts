import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesAwardDto } from './dto/create-profiles-award.dto';
import { UpdateProfilesAwardDto } from './dto/update-profiles-award.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesAward } from './entities/profiles-award.entity';

@Injectable()
export class ProfilesAwardsService {
  constructor(
    @InjectRepository(ProfilesAward)
    private readonly profilesAwardsRepository: Repository<ProfilesAward>,
  ) {}
  async create(createProfilesAwardDto: CreateProfilesAwardDto) {
    try {
      const profilesAward = this.profilesAwardsRepository.create(
        createProfilesAwardDto,
      );

      return await this.profilesAwardsRepository.save(profilesAward);
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.profilesAwardsRepository.find({
        where: {
          accountId: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, accountId: string) {
    try {
      return await this.profilesAwardsRepository.findOne({
        where: {
          id,
          accountId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProfilesAwardDto: UpdateProfilesAwardDto) {
    try {
      const profilesAward = await this.profilesAwardsRepository.findOne({
        where: {
          id,
          accountId: updateProfilesAwardDto.accountId,
        },
      });

      if (!profilesAward) {
        throw new Error('Profile award not found');
      }

      const updatedProfilesAward = Object.assign(
        profilesAward,
        updateProfilesAwardDto,
      );

      return await this.profilesAwardsRepository.save(updatedProfilesAward);
    } catch (error) {
      throw error;
    }
  }

  async removeOne(id: number, accountId: string) {
    try {
      const profilesAward = await this.profilesAwardsRepository.findOne({
        where: {
          id,
          accountId,
        },
      });

      if (!profilesAward) {
        throw new Error('Profile award not found');
      }

      return await this.profilesAwardsRepository.remove(profilesAward);
    } catch (error) {
      throw error;
    }
  }

  async removeMany(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const query = this.profilesAwardsRepository
        .createQueryBuilder('profiles_awards')
        .where(
          'profiles_awards.id IN (:...ids) AND profiles_awards.accountId = :accountId',
          {
            ids: idArray,
            accountId,
          },
        );

      const dataProfileAwards = await query.getMany();

      if (dataProfileAwards.length === 0) {
        throw new BadRequestException('Profile awards not found');
      }

      await this.profilesAwardsRepository.remove(dataProfileAwards);

      return 'Profile awards records removed successfully';
    } catch (error) {
      throw error;
    }
  }
}
