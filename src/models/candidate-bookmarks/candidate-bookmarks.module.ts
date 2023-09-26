import { Module } from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CandidateBookmarksController } from './candidate-bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateBookmark } from './entities/candidate-bookmark.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { ProfilesModule } from '../profile-models/profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateBookmark]),
    JwtAccessTokenServiceModule,
    ProfilesModule,
  ],
  controllers: [CandidateBookmarksController],
  providers: [CandidateBookmarksService],
})
export class CandidateBookmarksModule {}
