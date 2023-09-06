import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesSkillDto } from './dto/create-profiles-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesSkill } from './entities/profiles-skill.entity';
import { LevelTypeService } from '../types/level-type/level-types.service';

@Injectable()
export class ProfilesSkillsService {
  constructor(
    @InjectRepository(ProfilesSkill)
    private readonly profilesSkillRepository: Repository<ProfilesSkill>,
    private readonly levelTypeService : LevelTypeService
  ) {}
  async create(createProfilesSkillDto: CreateProfilesSkillDto) {
    try {
      const dataSkillRole = this.levelTypeService.findOne(createProfilesSkillDto.skillRoleId)

      if (!dataSkillRole) {
        throw new BadRequestException('Level type not found')
      }

      const dataProfileSkill = await this.profilesSkillRepository.findOne({
        where: {
          skillRoleId: createProfilesSkillDto.skillRoleId,
          accountId: createProfilesSkillDto.accountId
        }
      })

      if (dataProfileSkill) {
        throw new BadRequestException('Skill Role already exists')
      }

      const profilesSkillEntity = this.profilesSkillRepository.create(createProfilesSkillDto)

      return await this.profilesSkillRepository.save(profilesSkillEntity);

    } catch (error) {
      throw error;      
    }
  }

  async findAll(id : string) {
    try {
      return await this.profilesSkillRepository.find({
        where: { accountId: id },
        relations: ['levelType']
      });

    } catch (error) {
      throw error
    }
  }

  async remove(id: number, accountId: string) {
    try {
      const dataProfileSkill = await this.profilesSkillRepository.findOne({
        where: {
          id,
          accountId
        }
      })

      if(!dataProfileSkill) {
        throw new BadRequestException('Profile Skill not found')
      }

      return await this.profilesSkillRepository.remove(dataProfileSkill)

    } catch (error) {
      throw error
    }
  }


  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const query = this.profilesSkillRepository
        .createQueryBuilder('profiles_skills')
        .where('profiles_skills.id IN (:...ids) AND profiles_skills.accountId = :accountId', {
          ids: idArray,
          accountId,
        });

      const dataProfileSkills = await query.getMany();

      if (dataProfileSkills.length === 0) {
        throw new BadRequestException('Profile skill not found');
      }

      await this.profilesSkillRepository.remove(dataProfileSkills);

      return 'Profile skill records removed successfully';
    } catch (error) {
      throw error;
    }
  }
}
