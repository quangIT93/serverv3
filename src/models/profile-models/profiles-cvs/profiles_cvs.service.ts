import { Injectable } from '@nestjs/common';
import { CreateProfilesCvDto } from './dto/create-profiles_cv.dto';
import { UpdateProfilesCvDto } from './dto/update-profiles_cv.dto';
import { CreateProfileCvsTransaction } from './transaction/profiles_cv.transaction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesCv } from './entities/profiles_cv.entity';
import { DeleteProfilesCvDto } from './dto/delete-profiles_cv.dto';
import { DeleteProfileCvsTransaction } from './transaction/delete_profiles_cv.transaction';

@Injectable()
export class ProfilesCvsService {
  constructor(
    @InjectRepository(ProfilesCv)
    private readonly profilesCvRepository: Repository<ProfilesCv>,
    private readonly createProfileCvsTransaction: CreateProfileCvsTransaction,
    private readonly deleteProfileCvsTransaction: DeleteProfileCvsTransaction,
  ) { }
  async create(createProfilesCvDto: CreateProfilesCvDto) {
    try {
      return await this.createProfileCvsTransaction.run(createProfilesCvDto);
    } catch (error) {
      throw error;
    }
  }

  async update(updateProfilesCvDto: UpdateProfilesCvDto) {
    try {
      await this.profilesCvRepository.update(
        {
          accountId: updateProfilesCvDto.accountId,
        },
        {
          status: 0
        }
      );
      await this.profilesCvRepository.update(
        {
          id: updateProfilesCvDto.id,
          accountId: updateProfilesCvDto.accountId,
        },
        {
          status: 1
        }
      );

      return;

    } catch (error) {
      throw error;
    }
  }

  async delete(dto: DeleteProfilesCvDto) {
    try {
      const data = await this.deleteProfileCvsTransaction.run(dto);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
