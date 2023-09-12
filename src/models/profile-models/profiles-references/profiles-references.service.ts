import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesReferenceDto } from './dto/create-profiles-reference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

      const result = await this.profilesReferenceRepository.delete({
        id: In(idArray),
        accountId,
      });

      if (
        result &&
        typeof result.affected === 'number' &&
        (result.affected === 0 || result.affected < idArray.length)
      ) {
        throw new BadRequestException(
          'Some profiles reference were not deleted',
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
