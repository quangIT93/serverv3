import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  create(_createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: string) {
    return this.profileRepository.findOne({ 
      relations: [
        'province',
        'profilesLocations', 
        'profilesLocations.province',
        'childCategories',
        'childCategories.parentCategory',
        'profilesExperiences', 
        'profilesEducations',
        'company',
        'company.companyRole',
        'company.companySize',
        'company.ward',
        'company.ward.district',
        'company.ward.district.province',
        'company.category',
        'company.companyImages',
      ],
      where: { accountId: id }
    });
  }

  update(id: number, _updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
