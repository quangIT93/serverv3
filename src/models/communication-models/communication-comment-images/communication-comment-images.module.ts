import { Module } from '@nestjs/common';
import { CommunicationCommentImagesService } from './communication-comment-images.service';
import { CommunicationCommentImagesController } from './communication-comment-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationCommentImage } from './entities/communication-comment-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationCommentImage
    ])
  ],
  controllers: [CommunicationCommentImagesController],
  providers: [CommunicationCommentImagesService]
})
export class CommunicationCommentImagesModule {}
