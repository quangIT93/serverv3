import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateCommunicationCommentDto } from '../dto/create-communication-comment.dto';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationCommentImagesService } from '../../communication-comment-images/communication-comment-images.service';
import { CreateCommunicationCommentImageDto } from '../../communication-comment-images/dto/create-communication-comment-image.dto';
import { Image } from '../interfaces/communication-comment.interface';
import { BUCKET_IMAGE_COMMUNICATION_COMMENT_UPLOAD } from 'src/common/constants';
import { AWSService } from 'src/services/aws/aws.service';

@Injectable()
export class CreateCommunicationCommentTransaction extends BaseTransaction<
  CreateCommunicationCommentDto,
  CommunicationComment
> {
  constructor(
    dataSource: DataSource,
    private readonly communicationCommentImagesService: CommunicationCommentImagesService,
    private readonly awsService: AWSService,
  ) {
    super(dataSource);
  }
  protected async execute(
    createCommunicationCommentDto: CreateCommunicationCommentDto,
    manager: EntityManager,
  ): Promise<CommunicationComment> {
    try {
      const newCommentEntity = manager.create(
        CommunicationComment,
        createCommunicationCommentDto,
      );
      const newComment = await manager.save(newCommentEntity);

      const newCommunicationCommentImageDto = (
        createCommunicationCommentDto.images as any as Image[]
      )?.map(
        (image) =>
          new CreateCommunicationCommentImageDto(
            newComment.id,
            image.originalname,
          ),
      );

      await this.communicationCommentImagesService.createMany(
        newCommunicationCommentImageDto as CreateCommunicationCommentImageDto[],
        manager,
      );

      const imageBuffer = createCommunicationCommentDto.images
      ? createCommunicationCommentDto.images.map((image: any) => image)
      : [];

      if (createCommunicationCommentDto.images) {
        await this.awsService.uploadMutilpleFiles(imageBuffer, {
          BUCKET: BUCKET_IMAGE_COMMUNICATION_COMMENT_UPLOAD,
          id: String(newComment.id),
        });
      }

      return newComment;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
