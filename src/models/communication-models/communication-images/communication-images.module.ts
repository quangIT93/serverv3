import { Module } from '@nestjs/common';
import { CommunicationImagesService } from './communication-images.service';
import { CommunicationImagesController } from './communication-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationImage } from './entities/communication-image.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationImage
    ]),
    JwtAccessTokenModule
  ],
  controllers: [CommunicationImagesController],
  providers: [CommunicationImagesService],
  exports: [CommunicationImagesService]
})
export class CommunicationImagesModule {}
