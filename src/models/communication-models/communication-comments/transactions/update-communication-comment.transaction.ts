import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { DataSource, EntityManager } from 'typeorm';
import { Image } from '../../communication-comments/interfaces/communication-comment.interface';
import { BUCKET_IMAGE_COMMUNICATION_COMMENT_UPLOAD } from 'src/common/constants';
import { AWSService } from 'src/services/aws/aws.service';
import { UpdateCommunicationCommentDto } from '../dto/update-communication-comment.dto';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { CommunicationCommentImagesService } from '../../communication-comment-images/communication-comment-images.service';
import { CreateCommunicationCommentImageDto } from '../../communication-comment-images/dto/create-communication-comment-image.dto';

@Injectable()
export class UpdateCommunicationCommentTransaction extends BaseTransaction<
  UpdateCommunicationCommentDto,
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
    updateCommunicationCommentDto: UpdateCommunicationCommentDto,
    manager: EntityManager,
  ): Promise<CommunicationComment> {
    try {
      let newCommunicationComment;
      let currentImageIds: number[] = [];

      const newUpdateCommunicationCommentEntity = manager.create(
        CommunicationComment,
        updateCommunicationCommentDto,
      );

      const existingCommunicationComment = await manager.findOne(
        CommunicationComment,
        {
          where: {
            id: updateCommunicationCommentDto.commentId,
            accountId: updateCommunicationCommentDto.accountId,
          },
        },
      );

      existingCommunicationComment?.communicationCommentImages.map((image) => {
        currentImageIds.push(image.id);
      });

      if (existingCommunicationComment) {
        existingCommunicationComment.content =
          newUpdateCommunicationCommentEntity.content;

        newCommunicationComment = await manager.save(
          existingCommunicationComment,
        );

        // delete all communication categories where id
        await this.communicationCommentImagesService.delete(
          newCommunicationComment.id,
          manager,
        );

        // create communication images

        if (updateCommunicationCommentDto.images) {
          const newCommunicationCommentImageDto = (
            updateCommunicationCommentDto.images as any as Image[]
          )?.map(
            (image) =>
              new CreateCommunicationCommentImageDto(
                updateCommunicationCommentDto.commentId,
                image.originalname,
              ),
          );

          await this.communicationCommentImagesService.createMany(
            newCommunicationCommentImageDto as unknown as CreateCommunicationCommentImageDto[],
            manager,
          );

          const imageBuffer = updateCommunicationCommentDto.images
            ? updateCommunicationCommentDto.images.map((image: any) => image)
            : [];

          await this.awsService.uploadMutilpleFiles(imageBuffer, {
            BUCKET: BUCKET_IMAGE_COMMUNICATION_COMMENT_UPLOAD,
            id: String(newCommunicationComment.id),
          });
        }

        return newCommunicationComment;
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
