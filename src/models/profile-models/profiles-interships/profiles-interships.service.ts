import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesIntershipDto } from './dto/create-profiles-intership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(id: string) {
    try {
      return await this.profilesIntershipRepository.find({
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

      const query = this.profilesIntershipRepository
        .createQueryBuilder('profiles_interships')
        .where(
          'profiles_interships.id IN (:...ids) AND profiles_interships.accountId = :accountId',
          {
            ids: idArray,
            accountId,
          },
        );

      const dataProfileInterships = await query.getMany();

      if (dataProfileInterships.length === 0) {
        throw new Error('Profile intership not found');
      }

      await this.profilesIntershipRepository.remove(dataProfileInterships);

      return 'Profile intership records removed successfully';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, accountId: string) {
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

      return await this.profilesIntershipRepository.remove(profilesIntership);
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
    const profilesIntership = await this.profilesIntershipRepository.findOne({
      where: {
        id,
        accountId: dto.accountId,
      },
    });

    if (!profilesIntership) {
      throw new BadRequestException('Profile intership not found');
    }

    return await this.profilesIntershipRepository.save({
      ...profilesIntership,
      ...dto,
    });
  }
}
