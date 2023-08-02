import { Injectable } from '@nestjs/common';
import { CreateKeywordNotificationDto } from './dto/create-keyword-notification.dto';
import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordNotification } from './entities/keyword-notification.entity';
import { Repository } from 'typeorm';
import { KeywordCategoriesService } from '../keyword-categories/keyword-categories.service';
import { KeywordDistrictsService } from '../keyword-districts/keyword-districts.service';

@Injectable()
export class KeywordNotificationsService {

  constructor(
    @InjectRepository(KeywordNotification)
    private readonly keywordNotificationRepository: Repository<KeywordNotification>,
    private readonly keywordCategoriesService : KeywordCategoriesService,
    private readonly keywordDistrictsService: KeywordDistrictsService,
  ) {}
  async create(_createKeywordNotificationDto: CreateKeywordNotificationDto) {
    try {
        const newKeywordNotification = this.keywordNotificationRepository.create({..._createKeywordNotificationDto, districtId: _createKeywordNotificationDto.districtsId[0], 
          categoryId: _createKeywordNotificationDto.categoriesId[0]
        })
        const createKeywordCategory = await this.keywordNotificationRepository.save(newKeywordNotification);

        if (createKeywordCategory) {
          await this.keywordCategoriesService.create({
            keywordId: createKeywordCategory.id,
            categoryId: _createKeywordNotificationDto.categoriesId
          })

          await this.keywordDistrictsService.create({
            keywordId: createKeywordCategory.id,
            districtId: _createKeywordNotificationDto.districtsId
          })
        }
      
    } catch (error) {
      throw new Error('Error creating keyword notification');
    }
  }

  async findAll(id: string) {
    try {
      return await this.keywordNotificationRepository.find({
        where: {
          accoundId: id,
        },
        relations: ['categories', 'districts', 'districts.province']
      })
    } catch (error) {
      throw new Error('Error finding keyword notifications');
    }
  }

  async update(id: number, updateKeywordNotificationDto: UpdateKeywordNotificationDto) {
    try {
      updateKeywordNotificationDto.keyword && await this.keywordNotificationRepository.update(+id, {
        keyword: updateKeywordNotificationDto.keyword
      }) 

      await this.keywordCategoriesService.deteleAllByKeywordId(id)

      await this.keywordDistrictsService.deteleAllByKeywordId(id)

      if (updateKeywordNotificationDto.categoriesId && updateKeywordNotificationDto.categoriesId.length > 0) {
        await this.keywordCategoriesService.create({
          keywordId: id,
          categoryId: updateKeywordNotificationDto.categoriesId
        })
      }

      if (updateKeywordNotificationDto.districtsId && updateKeywordNotificationDto.districtsId.length > 0 ) {
        await this.keywordDistrictsService.create({
          keywordId: id,
          districtId: updateKeywordNotificationDto.districtsId
        })
      }

    } catch (error) {
      throw new Error('Error updating keyword notification');
    }
  }
}
