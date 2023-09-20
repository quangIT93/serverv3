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
    private readonly deleteProfileCvsTransaction : DeleteProfileCvsTransaction
  ) {}
  async create(createProfilesCvDto: CreateProfilesCvDto) {
    try {
      return await this.createProfileCvsTransaction.run(createProfilesCvDto);
    } catch (error) {
      throw error;
    }
  }

  async update(updateProfilesCvDto: UpdateProfilesCvDto) {
    try {
      const query = this.profilesCvRepository
        .createQueryBuilder('profiles_cv')
        .where('profiles_cv.id != :id', { id: updateProfilesCvDto.id });

      const profileCV = await query.getMany();

      // Update data to status = 0
      for (const record of profileCV) {
        record.status = 0;
      }

      await this.profilesCvRepository.save(profileCV);

      await this.profilesCvRepository.update(
        updateProfilesCvDto.id,
        updateProfilesCvDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(dto: DeleteProfilesCvDto) {
    try {
      
      const data = await this.deleteProfileCvsTransaction.run(dto);

      return data
    } catch (error) {
      throw error;
    }
  }
}
