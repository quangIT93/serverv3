import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfilesSkillDto } from './dto/create-profiles-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfilesSkill } from './entities/profiles-skill.entity';
import { LevelTypeService } from '../types/level-type/level-types.service';

@Injectable()
export class ProfilesSkillsService {
  constructor(
    @InjectRepository(ProfilesSkill)
    private readonly profilesSkillRepository: Repository<ProfilesSkill>,
    private readonly levelTypeService: LevelTypeService,
  ) {}
  async create(createProfilesSkillDto: CreateProfilesSkillDto) {
    try {
      const dataSkillRole = await this.levelTypeService.findOne(
        createProfilesSkillDto.skillRoleId,
      );

      if (!dataSkillRole) {
        throw new BadRequestException('Level type not found');
      }

      const dataProfileSkill = await this.profilesSkillRepository.findOne({
        where: {
          skillRoleId: createProfilesSkillDto.skillRoleId,
          accountId: createProfilesSkillDto.accountId,
          skillName: createProfilesSkillDto.skillName,
        },
      });

      if (dataProfileSkill) {
        throw new BadRequestException('Skill Role already exists');
      }

      const profilesSkillEntity = this.profilesSkillRepository.create(
        createProfilesSkillDto,
      );

      return await this.profilesSkillRepository.save(profilesSkillEntity);
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.profilesSkillRepository.find({
        where: { accountId: id },
        relations: ['levelType'],
      });
    } catch (error) {
      throw error;
    }
  }

  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const result = await this.profilesSkillRepository.delete({ id: In(idArray), accountId });

      if (result && typeof result.affected === 'number' && ( result.affected === 0 || result.affected < idArray.length )) {
        throw new BadRequestException('Some profiles skill were not deleted');
      }

    } catch (error) {
      throw error;
    }
  }
}
