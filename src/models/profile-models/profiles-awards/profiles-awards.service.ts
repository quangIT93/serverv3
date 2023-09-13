import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesAwardDto } from './dto/create-profiles-award.dto';
import { UpdateProfilesAwardDto } from './dto/update-profiles-award.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
      return await this.profilesAwardsRepository.update(
        {
          id,
          accountId: updateProfilesAwardDto.accountId,
        },
        updateProfilesAwardDto,
      ); 
    } catch (error) {
      throw error;
    }
  }

  async removeMany(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const result = await this.profilesAwardsRepository.delete({
        id: In(idArray),
        accountId,
      });

      if (result && typeof result.affected === 'number' && ( result.affected === 0 || result.affected < idArray.length )) {
        throw new BadRequestException('Error deleting profile awards');
      }
    } catch (error) {
      throw error;
    }
  }
}
