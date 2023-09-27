import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  create(_createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profiles`;
  }

  async findOne(id: string) {
    let result = await this.profileRepository.findOne({
      relations: [
        'user',
        'province',
        'profilesLocations',
        'profilesLocations.province',
        'childCategories',
        'childCategories.parentCategory',
        'profilesExperiences',
        'profilesEducations',
        'profilesAward',
        'profilesCourse',
        'profilesHobby',
        'profilesActivity',
        'profilesIntership',
        'profilesReference',
        'profilesSkill',
        'profilesSkill.levelType',
        'profileLanguage',
        'profileLanguage.levelTypeLanguage',
        // 'profilesJob',
        'profilesCv',
        'jobType',
        'company',
        'company.companyRole',
        'company.companySize',
        'company.ward',
        'company.ward.district',
        'company.ward.district.province',
        'company.category',
        'company.companyImages',
      ],
      where: { accountId: id },
    });

    return result;
  }

  getProfileEmail(id: string) {
    return this.profileRepository.findOne({
      select: ['email'],
      where: { accountId: id },
    });
  }

  async getProfileById(id: string): Promise<Profile | any> {
    try {
      console.log(id);
      const profile = await this.profileRepository.findOne({
        where: { accountId: id },
      });

      if (!profile) {
        new BadRequestException('User not found');
      }

      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async update(updateProfileDto: UpdateProfileDto) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { accountId: updateProfileDto.accountId },
      });

      if (!profile) {
        throw new Error('Profile not found');
      }

      const updatedProfile = Object.assign(profile, updateProfileDto);

      await this.profileRepository.save(updatedProfile);
    } catch (error) {
      throw error;
    }
  }

  // remove(id: number) {`
  //   return `This action removes a #${id} profile`;
  // }`
}
