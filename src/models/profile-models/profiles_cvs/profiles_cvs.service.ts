import { Injectable } from '@nestjs/common';
import { CreateProfilesCvDto } from './dto/create-profiles_cv.dto';
import { UpdateProfilesCvDto } from './dto/update-profiles_cv.dto';
import { CreateProfileCvsTransaction } from './transaction/profiles_cv.transaction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesCv } from './entities/profiles_cv.entity';

@Injectable()
export class ProfilesCvsService {
  constructor(
    @InjectRepository(ProfilesCv)
    private readonly profilesCvRepository: Repository<ProfilesCv>,
    private readonly createProfileCvsTransaction: CreateProfileCvsTransaction
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
      
      await this.profilesCvRepository.update(updateProfilesCvDto.id, updateProfilesCvDto);

    } catch (error) {
      throw error;
    }
  }
}
