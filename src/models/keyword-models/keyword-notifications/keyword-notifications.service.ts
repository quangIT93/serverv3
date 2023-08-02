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
      return this.keywordNotificationRepository.find({
        where: {
          accoundId: id,
        },
        relations: ['categories', 'districts']
      }
      )
    } catch (error) {
      throw new Error('Error finding keyword notifications');
    }
  }

  async update(id: number, _updateKeywordNotificationDto: UpdateKeywordNotificationDto) {
    try {
      await this.keywordNotificationRepository.update(+id, {
        keyword: _updateKeywordNotificationDto.keyword
      }) 

      await this.keywordCategoriesService.deteleAllByKeywordId(id)

      await this.keywordDistrictsService.deteleAllByKeywordId(id)

      if (_updateKeywordNotificationDto.categoriesId.length > 0 ) {
        await this.keywordCategoriesService.create({
          keywordId: id,
          categoryId: _updateKeywordNotificationDto.categoriesId
        })
      }

      if (_updateKeywordNotificationDto.districtsId.length > 0 ) {
        await this.keywordDistrictsService.create({
          keywordId: id,
          districtId: _updateKeywordNotificationDto.districtsId
        })
      }

    } catch (error) {
      throw new Error('Error updating keyword notification');
    }
  }
}
