import { Module } from '@nestjs/common';
import { CommunicationCommentsService } from './communication-comments.service';
import { CommunicationCommentsController } from './communication-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationComment } from './entities/communication-comment.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { CommunicationCommentImagesModule } from '../communication-comment-images/communication-comment-images.module';
import { CreateCommunicationCommentTransaction } from './transactions/create-communication-comment.transaction';
import { UpdateCommunicationCommentTransaction } from './transactions/update-communication-comment.transaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationComment
    ]),
    JwtAccessTokenServiceModule,
    CommunicationCommentImagesModule,
    AWSModule,
  ],
  controllers: [CommunicationCommentsController ],
  providers: [CommunicationCommentsService, CreateCommunicationCommentTransaction, UpdateCommunicationCommentTransaction],
  exports: [CommunicationCommentsService],
  
})
export class CommunicationCommentsModule {}
