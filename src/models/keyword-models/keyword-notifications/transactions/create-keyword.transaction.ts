import { DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateKeywordNotificationDto } from '../dto/create-keyword-notification.dto';
import { KeywordNotification } from '../entities/keyword-notification.entity';
import { KeywordCategoriesService } from '../../keyword-categories/keyword-categories.service';
import { KeywordDistrictsService } from '../../keyword-districts/keyword-districts.service';

@Injectable()
export class CreateKeywordTransaction extends BaseTransaction<
    CreateKeywordNotificationDto,
    KeywordNotification
> {
    constructor(
        dataSource: DataSource,
        // private readonly keywordNotification
        private readonly keywordCategoriesService: KeywordCategoriesService,
        private readonly keywordDistrictsService: KeywordDistrictsService,
    ) {
        super(dataSource);
    }

    protected async execute(
        createKeywordNotificationDto: CreateKeywordNotificationDto,
        manager: EntityManager,
    ): Promise<KeywordNotification> {
        try {
            const newKeywordNotificationEntity = manager.create(KeywordNotification, {
                ...createKeywordNotificationDto,
                districtId: createKeywordNotificationDto.districtsId[0],
                categoryId: 2,
            });

            const newKeywordNotification = await manager.save(newKeywordNotificationEntity);

            const keywordCategoriesDto = createKeywordNotificationDto.categoriesId.map(
                (categoryId) => ({
                    keywordId: newKeywordNotification.id,
                    categoryId,
                }),
            );

            const keywordDistrictsDto = createKeywordNotificationDto.districtsId.map(
                (districtId) => ({
                    keywordId: newKeywordNotification.id,
                    districtId,
                }),
            );

            await this.keywordCategoriesService.createMany(keywordCategoriesDto, manager);
            await this.keywordDistrictsService.createMany(keywordDistrictsDto, manager);
            
            return newKeywordNotification;
        } catch (error) {
            throw new Error('Error creating keyword notification');
        }
    }
}
