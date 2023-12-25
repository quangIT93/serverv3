import { Module } from '@nestjs/common';
import { CommunicationBookmarkedService } from './communication-bookmarked.service';
import { CommunicationBookmarkedController } from './communication-bookmarked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationBookmarked } from './entities/communication-bookmarked.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { CommunicationViewsModule } from '../communication-views/communication-views.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunicationBookmarked]),
    JwtAccessTokenModule,
    CommunicationViewsModule
  ],
  controllers: [CommunicationBookmarkedController],
  providers: [CommunicationBookmarkedService],
})
export class CommunicationBookmarkedModule {}
