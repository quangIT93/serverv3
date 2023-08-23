import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { UpdateCommunicationDto } from '../dto/update-communication.dto';
import { Communication } from '../entities/communication.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationImagesService } from '../../communication-images/communication-images.service';
import { CreateCommunicationImageDto } from '../../communication-images/dto/create-communication-image.dto';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';
import { AWSService } from 'src/services/aws/aws.service';

@Injectable()
export class UpdateCommunicationTransaction extends BaseTransaction<
  UpdateCommunicationDto,
  Communication
> {
  constructor(
    dataSource: DataSource,
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
      let currentImageIds: number[] = [];
      const newUpdateCommunicationEntity = manager.create(
        Communication,
        updateCommunicationDto,
      );

      const existingCommunication = await manager.findOne(Communication, {
        where: {
          id: updateCommunicationDto.id,
          accountId: updateCommunicationDto.accountId,
        },
        relations: ['communicationImages'],
      });

      existingCommunication?.communicationImages.map((image) => {
        currentImageIds.push(image.id);
      });

      if (existingCommunication) {
        const newCommunication = await manager.save(
          newUpdateCommunicationEntity,
        );

        if (updateCommunicationDto.deleteImages) {
          await this.communicationImagesService.delete(
            updateCommunicationDto.deleteImages,
          );

          const BASE_URL =
            BUCKET_IMAGE_COMMUNICATION_UPLOAD +
            '/' +
            existingCommunication.id +
            '/';
            const deletedImagesUrls = updateCommunicationDto.deleteImages.map(
              (imageId) => {
                if (currentImageIds.includes(imageId)) {
                  return (
                    BASE_URL + existingCommunication.communicationImages.find((image) => image.id === imageId)?.image
                  );
                } else {
                  return null; 
                }
              }
            );
            
          if (deletedImagesUrls.length > 0) {
            await this.awsService.deleteMultipleFiles(deletedImagesUrls as string[]);
          }
        }

        // create communication images

        if (updateCommunicationDto?.images?.length > 0) {
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
    } catch (error) {
      throw error;
    }
  }
}
