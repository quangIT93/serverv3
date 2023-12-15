import { Module } from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationView } from './entities/communication-view.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommunicationView
    ]),
    JwtAccessTokenModule
  ],
  providers: [CommunicationViewsService],
  exports: [CommunicationViewsService]
})
export class CommunicationViewsModule {}
