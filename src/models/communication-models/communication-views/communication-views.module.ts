import { Module } from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { CommunicationViewsController } from './communication-views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationView } from './entities/communication-view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationView
    ])
  ],
  controllers: [CommunicationViewsController],
  providers: [CommunicationViewsService]
})
export class CommunicationViewsModule {}
