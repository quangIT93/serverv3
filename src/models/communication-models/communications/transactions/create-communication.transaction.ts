import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateCommunicationDto } from '../dto/create-communication.dto';
import { Communication } from '../entities/communication.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationImagesService } from '../../communication-images/communication-images.service';
import { CommunicationCategoriesService } from '../../communication-categories/communication-categories.service';
import { CreateCommunicationImageDto } from '../../communication-images/dto/create-communication-image.dto';
import { CreateCommunicationCategoriesDto } from '../../communication-categories/dto/create-communication-categories.dto';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';
import { Image } from '../../communication-comments/interfaces/communication-comment.interface';
import { AWSService } from 'src/services/aws/aws.service';
@Injectable()
export class CreateCommunicationTransaction extends BaseTransaction<
  CreateCommunicationDto,
  Communication
> {
  constructor(
    dataSource: DataSource,
    private communicationImagesService: CommunicationImagesService,
    private communicationCategoriesService: CommunicationCategoriesService,
    private readonly awsService: AWSService,
  ) {
    super(dataSource);
  }
  protected async execute(
    createCommunicationDto: CreateCommunicationDto,
    manager: EntityManager,
  ): Promise<Communication> {
    try {
      const newCommunicationEntity = manager.create(
        Communication,
        createCommunicationDto,
      );
      const newCommunication = await manager.save(newCommunicationEntity);

      const newCommunicationImageDto = (
        createCommunicationDto.images as any as Image[]
      )?.map(
        (image) =>
          new CreateCommunicationImageDto(
            newCommunication.id,
            image.originalname,
          ),
      );

      const newCommunicationCategoriesDto =
        createCommunicationDto.categoryId?.map(
          (category) =>
            new CreateCommunicationCategoriesDto(newCommunication.id, category),
        );

      // save in communication images
      await this.communicationImagesService.createMany(
        newCommunicationImageDto as CreateCommunicationImageDto[],
        manager,
      );
      // save in communication category
      await this.communicationCategoriesService.createMany(
        newCommunicationCategoriesDto as CreateCommunicationCategoriesDto[],
        manager,
      );

      const imageBuffer = createCommunicationDto.images
        ? createCommunicationDto.images.map((image: any) => image)
        : [];

      if (createCommunicationDto.images) {
        await this.awsService.uploadMutilpleFiles(imageBuffer, {
          BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
          id: String(newCommunication.id),
        });
      }

      return newCommunication;
    } catch (error) {
      throw new Error('Create communication failed.');
    }
  }
}
