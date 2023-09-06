import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileLanguageDto } from './dto/create-profile-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileLanguage } from './entities/profile-language.entity';
import { LanguageTypesService } from '../types/language-types/language-types.service';

@Injectable()
export class ProfileLanguagesService {
  constructor(
    @InjectRepository(ProfileLanguage)
    private readonly profilesLanguageRepository: Repository<ProfileLanguage>,
    private readonly languageTypesService: LanguageTypesService,
  ) {}
  async create(createProfileLanguageDto: CreateProfileLanguageDto) {
    try {
      const dataType = this.languageTypesService.findOne(
        createProfileLanguageDto.languageRoleId,
      );

      if (!dataType) {
        throw new BadRequestException('Level type not found');
      }

      const dataProfileLanguage = await this.profilesLanguageRepository.findOne(
        {
          where: {
            languageRoleId: createProfileLanguageDto.languageRoleId,
            accountId: createProfileLanguageDto.accountId,
          },
        },
      );

      if (dataProfileLanguage) {
        throw new BadRequestException('Languege already exists');
      }

      const profilesLanguageEntity = this.profilesLanguageRepository.create(
        createProfileLanguageDto,
      );

      return await this.profilesLanguageRepository.save(profilesLanguageEntity);
    } catch (error) {
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.profilesLanguageRepository.find({
        where: { accountId: id },
        relations: ['levelTypeLanguage'],
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, accountId: string) {
    try {
      const dataProfileSkill = await this.profilesLanguageRepository.findOne({
        where: {
          id,
          accountId,
        },
      });

      if (!dataProfileSkill) {
        throw new BadRequestException('Profile language not found');
      }

      return await this.profilesLanguageRepository.remove(dataProfileSkill);
    } catch (error) {
      throw error;
    }
  }

  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const query = this.profilesLanguageRepository
        .createQueryBuilder('profiles_languages')
        .where('profiles_languages.id IN (:...ids) AND profiles_languages.accountId = :accountId', {
          ids: idArray,
          accountId,
        });

      const dataProfileSkills = await query.getMany();

      if (dataProfileSkills.length === 0) {
        throw new BadRequestException('Profile language not found');
      }

      await this.profilesLanguageRepository.remove(dataProfileSkills);

      return 'Profile language records removed successfully';
    } catch (error) {
      throw error;
    }
  }
}
