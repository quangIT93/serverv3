import { BookmarksService } from './../../bookmarks/bookmarks.service';
import { ViewProfilesService } from './../../view_profiles/view_profiles.service';
import { ApplicationsService } from './../../application-model/applications/applications.service';
import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { PostViewsService } from 'src/models/post-models/post-views/post-views.service';
import { ProfileActivityDetail, CandidateProfileLog, RecruiterProfileLog } from './domain/profile-log';
import { CandidateBookmark } from 'src/models/candidate-bookmarks/entities/candidate-bookmark.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly postViewsService: PostViewsService,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly applicationsService: ApplicationsService,
    private readonly viewProfilesService: ViewProfilesService,
    @InjectRepository(CandidateBookmark)  
    private readonly candidateBookmarkRepository: Repository<CandidateBookmark>,
    private readonly bookmarksService: BookmarksService,
  ) {}

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

  async getSearchLogs(id: string) {
    try {
      const searchLogs = await this.profileRepository
        .query(`SELECT SUM(count) as total FROM search_history WHERE account_id = ?`, [id])
        .then((result) => {
          return +result[0].total;
        });

      return searchLogs;
    } catch (error) {
      throw error;
    }
  }

  // Get all comapnies save your profile
  async getSaveProfileLogs(id: string) {
    try {
      const saveYourProfileLogs = await this.profileRepository
        .query(`SELECT COUNT(*) as total FROM candidate_bookmarked WHERE candidate_id = ?`, [id])
        .then((result) => {
          return +result[0].total;
        });

      return saveYourProfileLogs;
    } catch (error) {
      throw error;
    }
  }

  async getSaveCommunityLogs(id: string) {
    try {
      const saveCommunityLogs = await this.profileRepository
        .query(`SELECT COUNT(*) as total FROM communication_bookmarked WHERE account_id = ?`, [id])
        .then((result) => {
          return +result[0].total;
        });

      return saveCommunityLogs;
    } catch (error) {
      throw error;
    }
  }

  async getCreateCommunityLogs(id: string) {
    try {
      const createCommunityLogs = await this.profileRepository
        .query(`SELECT COUNT(*) as total FROM communications WHERE account_id = ?`, [id])
        .then((result) => {
          return +result[0].total;
        });

      return createCommunityLogs;
    } catch (error) {
      throw error;
    }
  }

  // use for ROLE_Candidate 
  async findActivityByAccountId(id: string) {
    const result: CandidateProfileLog = new CandidateProfileLog();

    const postViewLogs = await this.postViewsService.findAllByAccountId(id);
    const totalPostView = await this.postViewsService.getTotalViewByAccountId(id);
    const applicationLogs = await this.applicationsService.getLogsApplicationByAccountId(id);
    const totalApplication = await this.applicationsService.getTotalApplicationByAccountId(id);
    const viewProfileLogs = await this.viewProfilesService.getLogViewProfile(id);
    const savePostLogs = await this.bookmarksService.getLogsByUserId(id);

    result.viewPostLogs = new ProfileActivityDetail(totalPostView.count, postViewLogs);
    result.applyLogs = new ProfileActivityDetail(totalApplication.count, applicationLogs);
    result.savePostLogs = new ProfileActivityDetail(savePostLogs.total, savePostLogs.data);

    result.viewProfileLogs = viewProfileLogs.total;
    result.searchLogs = await this.getSearchLogs(id);
    result.saveYourProfileLogs = await this.getSaveProfileLogs(id);
    result.saveCommunityLogs = await this.getSaveCommunityLogs(id);
    result.createCommunityLogs = await this.getCreateCommunityLogs(id);
    return {
      ...result,
    }
  }

  async getCandidateBookmarksSavedLogs(recruitId: string) {
    try {
      const query = this.candidateBookmarkRepository.createQueryBuilder('candidate_bookmarked')
      .select('MONTH(candidate_bookmarked.created_at)', 'month')
      .addSelect('YEAR(candidate_bookmarked.created_at)', 'year')
      .addSelect('COUNT(candidate_id)', 'count')
      .where('candidate_bookmarked.recruitId = :recruitId', { recruitId })
      .groupBy('month, year')
      .orderBy('year, month', 'DESC');

      const total = await query.getCount();

      const data = await query.getRawMany();

      return {
        data,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async getLogsViewCompany(id: string) {
    try {
      const total = await this.profileRepository.query(
        `SELECT COUNT(*) as total FROM company_view WHERE company_id = (SELECT id FROM companies WHERE account_id = ?)`,
        [id],
      ).then((result) => {
        return +result[0].total;
      });

      return total;
    }
    catch (error) {
      throw error;
    }
  }

  async getLogsSaveCompany(id: string) {
    try {
      const total = await this.profileRepository.query(
        `SELECT COUNT(*) as total FROM company_bookmarked WHERE company_id = (SELECT id FROM companies WHERE account_id = ?)`,
        [id],
      ).then((result) => {
        return +result[0].total;
      });

      return total;
    }
    catch (error) {
      throw error;
    }
  }

  // use for ROLE_Recruiter
  async findActivityByRecruiterId(id: string) {
    const result: RecruiterProfileLog = new RecruiterProfileLog();
    const applicationLogs = await this.applicationsService.getLogsApplicationByRecruiterId(id);
    const totalApplication = await this.applicationsService.getTotalApplicationByRecruiterId(id);
    const viewProfileLogs = await this.viewProfilesService.getLogViewProfileByRecruiterId(id);
    const saveCandidateLogs = await this.getCandidateBookmarksSavedLogs(id);

    result.applyLogs = new ProfileActivityDetail(totalApplication.count, applicationLogs);
    result.viewCandidateLogs = new ProfileActivityDetail(viewProfileLogs.total, viewProfileLogs.data);
    result.saveCandidateLogs = new ProfileActivityDetail(saveCandidateLogs.total, saveCandidateLogs.data);
    result.viewYourCompanyLogs = await this.getLogsViewCompany(id);
    result.saveYourCompanyLogs = await this.getSaveProfileLogs(id);
    result.createCommunityLogs = await this.getCreateCommunityLogs(id);
    result.saveCommunityLogs = await this.getSaveCommunityLogs(id);
    return {
      ...result,
    }
  }
  
}
