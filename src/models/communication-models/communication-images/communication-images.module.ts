import { Module } from '@nestjs/common';
import { CommunicationImagesService } from './communication-images.service';
import { CommunicationImagesController } from './communication-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationImage } from './entities/communication-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationImage
    ])
  ],
  controllers: [CommunicationImagesController],
  providers: [CommunicationImagesService]
})
export class CommunicationImagesModule {}
