import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { UpdateCommunicationDto } from '../dto/update-communication.dto';
import { Communication } from '../entities/communication.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationCategoriesService } from '../../communication-categories/communication-categories.service';
import { CommunicationImagesService } from '../../communication-images/communication-images.service';
import { CreateCommunicationImageDto } from '../../communication-images/dto/create-communication-image.dto';
import { CreateCommunicationCategoriesDto } from '../../communication-categories/dto/create-communication-categories.dto';

@Injectable()
export class UpdateCommunicationTransaction extends BaseTransaction<
  UpdateCommunicationDto,
  Communication
> {
  constructor(
    dataSource: DataSource,
    private readonly communicationCategoriesService: CommunicationCategoriesService,
    private readonly communicationImagesService: CommunicationImagesService,
  ) {
    super(dataSource);
  }

  protected async execute(
    updateCommunicationDto: UpdateCommunicationDto,
    manager: EntityManager,
  ): Promise<Communication> {
    try {
      let newCommunication;
      const newUpdateCommunicationEntity = manager.create(
        Communication,
        updateCommunicationDto,
      );

      const existingCommunication = await manager.findOne(Communication, {
        where: {
          id: updateCommunicationDto.id,
          accountId: updateCommunicationDto.accountId,
        },
      });

      if (existingCommunication) {
        newCommunication = await manager.save(newUpdateCommunicationEntity);

        // delete all communication categories where id
        await this.communicationCategoriesService.delete(
          newCommunication.id,
          manager,
        );

        // delete all communication images where id
        await this.communicationImagesService.delete(
          newCommunication.id,
          manager,
        );

        //  create communication categories
        if (updateCommunicationDto.categoryId) {
          const newCommunicationCategoriesDto =
            updateCommunicationDto.categoryId?.map(
              (category) =>
                new CreateCommunicationCategoriesDto(
                  updateCommunicationDto.id,
                  category,
                ),
            );
          await this.communicationCategoriesService.createMany(
            newCommunicationCategoriesDto,
            manager,
          );
        }

        // create communication images

        if (updateCommunicationDto.images) {
          const newCommunicationImageDto = updateCommunicationDto.images?.map(
            (image) =>
              new CreateCommunicationImageDto(updateCommunicationDto.id, image),
          );

          await this.communicationImagesService.createMany(
            newCommunicationImageDto as CreateCommunicationImageDto[],
            manager,
          );
        }

        return newCommunication;
      }
      throw new Error('Communication not found'); 

      // save
    } catch (error) {
      throw error
    }
  }
}
