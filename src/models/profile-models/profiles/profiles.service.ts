import { ApplicationsService } from './../../application-model/applications/applications.service';
import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { PostViewsService } from 'src/models/post-models/post-views/post-views.service';
import { ProfileActivityDetail, ProfileLog } from './domain/profile-log';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    // private readonly userService: UserService,
    private readonly postViewsService: PostViewsService,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly applicationsService: ApplicationsService,
  ) {}

  // create(_createProfileDto: CreateProfileDto) {
  //   return 'This action adds a new profile';
  // }

  // findAll() {
  //   return `This action returns all profiles`;
  // }

  async findOne(id: string) {
    try {
      let result = await this.profileRepository.findOne({
        relations: [
          'user',
          'province',
          'profilesLocations',
          'profilesLocations.province',
          'childCategories',
          'childCategories.parentCategory',
          'profilesExperiences',
          'profilesEducation',

          // 'profilesAward',
          // 'profilesCourse',
          // 'profilesHobby',
          // 'profilesActivity',
          // 'profilesIntership',
          // 'profilesReference',
          // 'profilesSkill',
          // 'profilesSkill.levelType',
          // 'profileLanguage',
          // 'profileLanguage.levelTypeLanguage',
          // 'profilesEducation.academicType',
          // 'profilesCv',
          // 'jobType',

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
        // relationLoadStrategy: 'query',
        // relationLoadStrategy: 'join'
      });

      return result;
    } catch (error) {
      throw error;
    }
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
      // const checkRecruit = await this.userService.findByIdAndType(accountId);

      // if (!checkRecruit) {
      //   throw new BadRequestException('Is not a recruiter');
      // }

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
        .leftJoinAndSelect('profile.profilesEducation', 'profilesEducation')
        .leftJoinAndSelect('profilesEducation.academicType', 'academicType')
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
        .leftJoinAndSelect(
          'profile.viewProfiles',
          'viewProfiles',
          'viewProfiles.recruitId = :recruitId',
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

  async getProfileInformation(id: string) {
    try {
      let result = await this.profileRepository.findOne({
        relations: [
          'user',
          'province',
          'profilesLocations',
          'profilesLocations.province',
          'childCategories',
          'childCategories.parentCategory',
          'company',
          // 'profilesExperiences',
          // 'profilesEducation',
        ],
        where: { accountId: id },
        // relationLoadStrategy: 'query',
        // relationLoadStrategy: 'join'
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileMoreInformation(id: string) {
    try {
      let result = await this.profileRepository.findOne({
        relations: [
          'profilesExperiences',
          'profilesEducation',
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
          'profilesEducation.academicType',
          'profilesCv',
          'jobType',
          // 'profilesExperiences',
          // 'profilesEducation',
        ],
        where: { accountId: id },
        // relationLoadStrategy: 'query',
        // relationLoadStrategy: 'join'
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileCompany(id: string) {
    try {
      const result = await this.companyRepository.findOne({
        where: { accountId: id },
        relations: [
          'companyRole',
          'companySize',
          'ward',
          'ward.district',
          'ward.district.province',
          'category',
          'companyImages',
        ],
        // relationLoadStrategy: 'query',
        // relationLoadStrategy: 'join'
      });

      if (!result) {
        throw new BadRequestException('You have not created company yet');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateAvatar(id: string, fileOriginalName: string) {
    const profile = await this.profileRepository.findOne({
      where: { accountId: id },
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    await this.profileRepository.update(id, {
      ...profile,
      avatar: fileOriginalName,
    });

    return await this.profileRepository.findOne({
      where: { accountId: id },
    });
  }

  async getListCompanyViewProfile(id: string) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { accountId: id },
      });

      if (!profile) {
        throw new BadRequestException('Profile not found');
      }

      const listCompanyViewProfile = await this.profileRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.viewProfiles', 'viewProfiles')
        .where('profile.accountId = :id', { id })
        .getOne();

      return listCompanyViewProfile;
    } catch (error) {
      throw error;
    }
  }

  async findActivityByAccountId(id: string) {
    const result: ProfileLog = new ProfileLog();
    const postViewLogs = await this.postViewsService.findAllByAccountId(id);
    const totalPostView = await this.postViewsService.getTotalViewByAccountId(id);

    const applicationLogs = await this.applicationsService.getLogsApplicationByAccountId(id);
    const totalApplication = await this.applicationsService.getTotalApplicationByAccountId(id);

    result.viewPostLogs = new ProfileActivityDetail(totalPostView.count, postViewLogs);
    result.applyLogs = new ProfileActivityDetail(totalApplication.count, applicationLogs);
    result.searchLogs = new ProfileActivityDetail(0, []);
    return {
      ...result,
    }
  }
}
