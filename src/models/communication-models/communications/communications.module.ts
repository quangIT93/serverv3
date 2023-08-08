import { Module } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CommunicationsController } from './communications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { CommunicationImagesModule } from '../communication-images/communication-images.module';
import { CommunicationCategoriesModule } from '../communication-categories/communication-categories.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Communication
    ]),
    JwtAccessTokenServiceModule,
    CommunicationImagesModule,
    CommunicationCategoriesModule,
    AWSModule
  ],
  controllers: [CommunicationsController],
  providers: [CommunicationsService, CreateCommunicationTransaction]
})
export class CommunicationsModule {}
