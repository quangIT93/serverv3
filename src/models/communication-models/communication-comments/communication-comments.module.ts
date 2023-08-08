import { Module } from '@nestjs/common';
import { CommunicationCommentsService } from './communication-comments.service';
import { CommunicationCommentsController } from './communication-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationComment } from './entities/communication-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationComment
    ])
  ],
  controllers: [CommunicationCommentsController],
  providers: [CommunicationCommentsService]
})
export class CommunicationCommentsModule {}
