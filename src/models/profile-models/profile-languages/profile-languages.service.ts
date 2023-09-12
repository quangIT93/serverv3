import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileLanguageDto } from './dto/create-profile-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async removeAll(ids: string | string[], accountId: string) {
    try {
      const idArray = Array.isArray(ids) ? ids : [ids];

      const result = await this.profilesLanguageRepository.delete({
        id: In(idArray),
        accountId,
      });

      if (
        result &&
        typeof result.affected === 'number' &&
        (result.affected === 0 || result.affected < idArray.length)
      ) {
        throw new BadRequestException('Error delete profile language');
      }
    } catch (error) {
      throw error;
    }
  }
}
