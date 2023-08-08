import { Module } from '@nestjs/common';
import { CommunicationLikesService } from './communication-likes.service';
import { CommunicationLikesController } from './communication-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationLike } from './entities/communication-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationLike
    ])
  ],
  controllers: [CommunicationLikesController],
  providers: [CommunicationLikesService]
})
export class CommunicationLikesModule {}
