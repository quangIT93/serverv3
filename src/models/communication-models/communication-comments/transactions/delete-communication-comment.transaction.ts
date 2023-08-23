import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { DeleteCommunicationCommentDto } from '../dto/delete-communication-comment.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommunicationComment } from '../entities/communication-comment.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CommunicationCommentImagesService } from '../../communication-comment-images/communication-comment-images.service';

@Injectable()
export class DeleteCommunicationCommentTransaction extends BaseTransaction<
  DeleteCommunicationCommentDto,
  CommunicationComment
> {
  constructor(
    dataSource: DataSource,
    private readonly communicationCommentImagesService: CommunicationCommentImagesService,
  ) // private readonly awsService: AWSService,
  {
    super(dataSource);
  }
  protected async execute(
    deleteCommunicationCommentDto: DeleteCommunicationCommentDto,
    manager: EntityManager,
  ): Promise<any> {
    try {

        const existingCommunicationComment = await manager.findOne(
          CommunicationComment,
          {
            where: {
              id: deleteCommunicationCommentDto.commentId,
              accountId: deleteCommunicationCommentDto.accountId,
            },
          },
        );

        if (existingCommunicationComment) {

            await manager.delete(CommunicationComment, existingCommunicationComment.id);

            await this.communicationCommentImagesService.delete(existingCommunicationComment.id, manager)

            return 'Delete comment succuess'

        }

        throw new BadRequestException('Delete fail.'); 
    } catch (error) {
      throw new BadRequestException('Method not implemented.');
    }
  }
}
