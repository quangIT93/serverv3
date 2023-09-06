import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesReferenceDto } from './dto/create-profiles-reference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesReference } from './entities/profiles-reference.entity';

@Injectable()
export class ProfilesReferencesService {
  constructor(
    @InjectRepository(ProfilesReference)
    private readonly profilesReferenceRepository: Repository<ProfilesReference>,
  ) {}
  async create(createProfilesReferenceDto: CreateProfilesReferenceDto) {
    try {
      const profileReferenceEntity = this.profilesReferenceRepository.create(
        createProfilesReferenceDto,
      );

      return await this.profilesReferenceRepository.save(
        profileReferenceEntity,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.profilesReferenceRepository.find({
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

      const query = this.profilesReferenceRepository
        .createQueryBuilder('profiles_references')
        .where(
          'profiles_references.id IN (:...ids) AND profiles_references.accountId = :accountId',
          {
            ids: idArray,
            accountId,
          },
        );

      const dataProfileReferencess = await query.getMany();

      if (dataProfileReferencess.length === 0) {
        throw new BadRequestException('Profile references not found');
      }

      await this.profilesReferenceRepository.remove(dataProfileReferencess);

      return 'Profile references records removed successfully';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const profileReference = await this.profilesReferenceRepository.findOne({
        where: {
          id,
        },
      });

      if (!profileReference) {
        throw new Error('Profile reference not found');
      }

      return await this.profilesReferenceRepository.remove(profileReference);
    } catch (error) {
      throw error;
    }
  }
}
