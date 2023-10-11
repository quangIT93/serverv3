import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from 'src/models/users/users.service';


@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
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
      relationLoadStrategy: 'query',
    });

    console.log(result);

    
    return result;
  }

  // async findOneByAccountId(id: string): Promise<Profile | null> {
  //   try {
  //     const profile = await this.profileRepository.findOne({
  //       where: { accountId: id },
  //     });

  //     profile!.user = await this.getUser(id) || new User();
  //     profile!.province = await this.getProvince(id) || new Province();

  //     return profile;
  //   } catch (error) {
  //     throw error;
  //   }

  // }

  // async getProvince(id: string): Promise<Province | null> {
  //   try {
  //     const profile = await this.profileRepository.findOne({
  //       where: { accountId: id },
  //     });

  //     if (!profile) {
  //       return null;
  //     }

  //     return profile.province;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getUser(id: string) {
  //   return this.userService.findById(id);
  // }

  getProfileEmail(id: string) {
    return this.profileRepository.findOne({
      select: ['email'],
      where: { accountId: id },
    });
  }

  async getProfileById(id: string, accountId: string) {
    try {
      const checkRecruit = await this.userService.findByIdAndType(accountId);

      if (!checkRecruit) {
        throw new BadRequestException('Is not a recruiter');
      }

      const profile = await this.profileRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('profile.province', 'province')
        .leftJoinAndSelect('profile.profilesLocations', 'profilesLocations')
        .leftJoinAndSelect(
          'profilesLocations.province',
          'profilesLocations_province',
        )
        .leftJoinAndSelect('profile.childCategories', 'childCategories')
        .leftJoinAndSelect(
          'childCategories.parentCategory',
          'childCategories_parentCategory',
        )
        .leftJoinAndSelect('profile.profilesExperiences', 'profilesExperiences')
        .leftJoinAndSelect('profile.profilesEducations', 'profilesEducations')
        .leftJoinAndSelect('profile.profilesAward', 'profilesAward')
        .leftJoinAndSelect('profile.profilesCourse', 'profilesCourse')
        .leftJoinAndSelect('profile.profilesHobby', 'profilesHobby')
        .leftJoinAndSelect('profile.profilesActivity', 'profilesActivity')
        .leftJoinAndSelect('profile.profilesIntership', 'profilesIntership')
        .leftJoinAndSelect('profile.profilesReference', 'profilesReference')
        .leftJoinAndSelect('profile.profilesSkill', 'profilesSkill')
        .leftJoinAndSelect('profilesSkill.levelType', 'profilesSkill_levelType')
        .leftJoinAndSelect('profile.profileLanguage', 'profileLanguage')
        .leftJoinAndSelect(
          'profileLanguage.levelTypeLanguage',
          'profileLanguage_levelTypeLanguage',
        )
        .leftJoinAndSelect('profile.profilesCv', 'profilesCv')
        .leftJoinAndSelect('profile.jobType', 'jobType')
        .leftJoinAndSelect(
          'profile.candidateBookmarked',
          'candidateBookmarked',
          'candidateBookmarked.recruitId = :recruitId',
          { recruitId: accountId },
        )
        .where('profile.accountId = :id', { id })
        .getOne();

      return profile;
    } catch (error) {
      throw error;
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
