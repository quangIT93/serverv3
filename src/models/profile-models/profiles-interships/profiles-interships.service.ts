import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesIntershipDto } from './dto/create-profiles-intership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesIntership } from './entities/profiles-intership.entity';
import { UpdateProfilesIntershipDto } from './dto/update-profiles-intership.dto';

@Injectable()
export class ProfilesIntershipsService {
  constructor(
    @InjectRepository(ProfilesIntership)
    private profilesIntershipRepository: Repository<ProfilesIntership>,
  ) {}
  async create(createProfilesIntershipDto: CreateProfilesIntershipDto) {
    try {
      const newProfilesIntershipEntity =
        this.profilesIntershipRepository.create(createProfilesIntershipDto);

      return await this.profilesIntershipRepository.save(
        newProfilesIntershipEntity,
      );
    } catch (error) {
      throw error;
    }
  }

  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const result = await this.profilesIntershipRepository.delete({
        id: In(idArray),
        accountId,
      });

      if (
        result &&
        typeof result.affected === 'number' &&
        (result.affected === 0 || result.affected < idArray.length)
      ) {
        throw new BadRequestException(
          'Some profiles intership were not deleted',
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, accountId: string) {
    try {
      const profilesIntership = await this.profilesIntershipRepository.findOne({
        where: {
          id,
          accountId,
        },
      });

      if (!profilesIntership) {
        throw new BadRequestException('Profile intership not found');
      }

      return profilesIntership;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, dto: UpdateProfilesIntershipDto) {
    try {
      return await this.profilesIntershipRepository.update(
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
}
