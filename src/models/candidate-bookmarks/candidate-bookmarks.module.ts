import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CandidateBookmarksController } from './candidate-bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateBookmark } from './entities/candidate-bookmark.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { ProfilesModule } from '../profile-models/profiles/profiles.module';
import { PageAndLimitMiddleware } from 'src/common/middlewares/page-limit/page-limit.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateBookmark]),
    JwtAccessTokenModule,
    ProfilesModule,
  ],
  controllers: [CandidateBookmarksController],
  providers: [CandidateBookmarksService],
  exports: [CandidateBookmarksService],
})
export class CandidateBookmarksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PageAndLimitMiddleware)
      .forRoutes(
        { path: 'candidate-bookmarks', method: RequestMethod.GET },
        { path: 'candidate-bookmarks/by-candidate', method: RequestMethod.GET },
      );
  }
}
