import { Injectable } from '@nestjs/common';
import { CreateProfilesActivityDto } from './dto/create-profiles-activity.dto';
import { UpdateProfilesActivityDto } from './dto/update-profiles-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesActivity } from './entities/profiles-activity.entity';

@Injectable()
export class ProfilesActivitiesService {
  constructor(
    @InjectRepository(ProfilesActivity)
    private readonly profilesActivityRepository: Repository<ProfilesActivity>,
  ) {}
  async create(createProfilesActivityDto: CreateProfilesActivityDto) {
    try {
      
      const newProfilesActivityEntity = this.profilesActivityRepository.create(createProfilesActivityDto);

      return await this.profilesActivityRepository.save(newProfilesActivityEntity);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all profilesActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profilesActivity`;
  }

  update(id: number, _updateProfilesActivityDto: UpdateProfilesActivityDto) {
    return `This action updates a #${id} profilesActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} profilesActivity`;
  }
}
