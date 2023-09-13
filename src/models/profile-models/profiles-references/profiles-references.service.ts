import { Injectable } from '@nestjs/common';
import { CreateProfilesReferenceDto } from './dto/create-profiles-reference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesReference } from './entities/profiles-reference.entity';
import { DeleteProfilesReferenceDto } from './dto/delete-profile-reference.dto';

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

  async removeAll(data: DeleteProfilesReferenceDto) {
    try {
      const idSet = new Set(data.ids);

      const result = await this.profilesReferenceRepository.delete({
        id: In([...idSet]),
        accountId: data.accountId,
      });

      return result
    } catch (error) {
      throw error;
    }
  }
}
