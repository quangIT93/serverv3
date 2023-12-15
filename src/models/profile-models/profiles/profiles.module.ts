import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { UnlockMiddleware } from 'src/common/middlewares/unclock/unlock.middleware';
import { UserModule } from 'src/models/users/users.module';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { PostViewsModule } from 'src/models/post-models/post-views/post-views.module';
import { ApplicationsModule } from 'src/models/application-model/applications/applications.module';
import { ViewProfilesModule } from 'src/models/view_profiles/view_profiles.module';
import { CandidateBookmark } from 'src/models/candidate-bookmarks/entities/candidate-bookmark.entity';
import { BookmarksModule } from 'src/models/bookmarks/bookmarks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Company, CandidateBookmark]),
    AuthModule,
    JwtAccessTokenModule,
    AWSModule,
    UserModule,
    PostViewsModule,
    ApplicationsModule,
    ViewProfilesModule,
    BookmarksModule
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UnlockMiddleware)
      .forRoutes({ path: 'profiles/:id', method: RequestMethod.GET });
  }
}
