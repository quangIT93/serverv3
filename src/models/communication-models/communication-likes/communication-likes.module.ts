import { Module } from '@nestjs/common';
import { CommunicationLikesService } from './communication-likes.service';
import { CommunicationLikesController } from './communication-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationLike } from './entities/communication-like.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationLike
    ]),
    JwtAccessTokenServiceModule
  ],
  controllers: [CommunicationLikesController],
  providers: [CommunicationLikesService],
  exports: [CommunicationLikesService]
})
export class CommunicationLikesModule {}
