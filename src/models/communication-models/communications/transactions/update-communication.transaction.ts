import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { UpdateCommunicationDto } from '../dto/update-communication.dto';
import { Communication } from '../entities/communication.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationCategoriesService } from '../../communication-categories/communication-categories.service';
import { CommunicationImagesService } from '../../communication-images/communication-images.service';
import { CreateCommunicationImageDto } from '../../communication-images/dto/create-communication-image.dto';
import { CreateCommunicationCategoriesDto } from '../../communication-categories/dto/create-communication-categories.dto';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';
import { AWSService } from 'src/services/aws/aws.service';

@Injectable()
export class UpdateCommunicationTransaction extends BaseTransaction<
  UpdateCommunicationDto,
  Communication
> {
  constructor(
    dataSource: DataSource,
    private readonly communicationCategoriesService: CommunicationCategoriesService,
    private readonly communicationImagesService: CommunicationImagesService,
    private readonly awsService: AWSService,
  ) {
    super(dataSource);
  }

  protected async execute(
    updateCommunicationDto: UpdateCommunicationDto,
    manager: EntityManager,
  ): Promise<Communication> {
    try {
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
        const newCommunication = await manager.save(
          newUpdateCommunicationEntity,
        );

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
          const imagesUploaded = await this.awsService.uploadMutilpleFiles(
            updateCommunicationDto.images,
            {
              BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
              id: newCommunication.id,
            },
          );

          const createCommunicationImagesDto: CreateCommunicationImageDto[] =
            imagesUploaded.map((image) => {
              return new CreateCommunicationImageDto(
                newCommunication.id,
                image.originalname,
              );
            });

          await this.communicationImagesService.createMany(
            createCommunicationImagesDto,
            manager,
          );
        }

        return newCommunication;
      }
      throw new BadRequestException(
        'Communication not found or communication does not exist of user',
      );

      // save
    } catch (error) {
      throw error;
    }
  }
}
