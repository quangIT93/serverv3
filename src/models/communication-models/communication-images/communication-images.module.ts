import { Module } from '@nestjs/common';
import { CommunicationImagesService } from './communication-images.service';
import { CommunicationImagesController } from './communication-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationImage } from './entities/communication-image.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationImage
    ]),
    AWSModule,
    JwtAccessTokenModule
  ],
  controllers: [CommunicationImagesController],
  providers: [CommunicationImagesService],
  exports: [CommunicationImagesService],
})
export class CommunicationImagesModule {}
