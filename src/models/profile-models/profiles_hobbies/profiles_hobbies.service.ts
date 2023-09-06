import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfilesHobbyDto } from './dto/create-profiles_hobby.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesHobby } from './entities/profiles_hobby.entity';

@Injectable()
export class ProfilesHobbiesService {
  constructor(
    @InjectRepository(ProfilesHobby)
    private readonly profilesHobbyRepository: Repository<ProfilesHobby>,
  ) {}
  async createOrUpate(createProfilesHobbyDto: CreateProfilesHobbyDto) {
    try {
      const dataProfilesHobby = await this.profilesHobbyRepository.findOne({
        where: {
          accountId: createProfilesHobbyDto.accountId,
        },
      });

      if (dataProfilesHobby) {
        dataProfilesHobby.description = createProfilesHobbyDto.description;
        return {
          statusCode: HttpStatus.OK,
          message: 'Update success',
        };
      }

      const newProfilesHobbyEntity = this.profilesHobbyRepository.create(
        createProfilesHobbyDto,
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesHobbyRepository.save(newProfilesHobbyEntity)
      }
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.profilesHobbyRepository.findOne({
        where: {
          accountId: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const dataProfilesHobby = await this.profilesHobbyRepository.findOne({
        where: {
          accountId: id,
        },
      });

      if (!dataProfilesHobby) {
        throw new Error('Data not found');
      }

      return this.profilesHobbyRepository.remove(dataProfilesHobby);

    } catch (error) {
      throw error;
    }
  }
}
