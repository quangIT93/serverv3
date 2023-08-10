import { Module } from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { CommunicationViewsController } from './communication-views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationView } from './entities/communication-view.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationView
    ]),
    JwtAccessTokenServiceModule
  ],
  controllers: [CommunicationViewsController],
  providers: [CommunicationViewsService]
})
export class CommunicationViewsModule {}
