import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './providers/database/mariadb/provider.module';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './models/users/users.module';
import { MailModule } from './providers/mail/provider.module';
import { QueueModule } from './providers/queue/provider.module';
import { JwtAccessTokenServiceModule } from './providers/jwt/atk.provider.module';
import { JwtRefreshTokenServiceModule } from './providers/jwt/rtk.provider.module';
import { ProvincesModule } from './models/locations/provinces/provinces.module';
import { UserHistoriesModule } from './models/user-histories/user-histories.module';
import { DistrictsModule } from './models/locations/districts/districts.module';
import { LanguageMiddleware } from './common/middlewares/language/language.middleware';
import { PostsModule } from './models/post-models/posts/posts.module';
import { HotPostsModule } from './models/hot-topics/hot-topics.module';
import { ChildrenModule } from './models/categories/children/children.module';
import { ParentModule } from './models/categories/parents/parents.module';
import { PostsCategoriesModule } from './models/post-models/posts-categories/posts-categories.module';
import { PostsImagesModule } from './models/post-models/posts-images/posts-images.module';
import { JobTypesModule } from './models/job-types/job-types.module';
import { SalaryTypesModule } from './models/salary-types/salary-types.module';
import { BookmarksModule } from './models/bookmarks/bookmarks.module';
import { MulterConfigModule } from './providers/storage/multer/provider.module';
import { AWSModule } from './providers/storage/aws/provider.module';
import { CompaniesModule } from './models/company-models/companies/companies.module';
import { CompanyRolesModule } from './models/company-models/company-roles/company-roles.module';
import { CompanySizesModule } from './models/company-models/company-sizes/company-sizes.module';
import { ProfilesModule } from './models/profile-models/profiles/profiles.module';
import { ProfilesCategoriesModule } from './models/profile-models/profiles-categories/profiles-categories.module';
import { ProfilesEducationsModule } from './models/profile-models/profiles-educations/profiles-educations.module';
import { ProfilesExperiencesModule } from './models/profile-models/profiles-experiences/profiles-experiences.module';
import { ProfilesLocationsModule } from './models/profile-models/profiles-locations/profiles-locations.module';
import { BannersController } from './models/banners/banners.controller';
import { BannersModule } from './models/banners/banners.module';
import { SearchModule } from './models/search-models/suggest-search/search.module';
import { ApplicationsModule } from './models/application-model/applications/applications.module';
import { HistoriesRecruiterModule } from './models/history-models/histories-recruiter/histories-recruiter.module';
import { FcmTokensModule } from './models/fcm-tokens/fcm-tokens.module';
import { FirebaseMessagingModule } from './services/firebase/messaging/firebase-messaging.module';
import { PostNotificationsModule } from './models/notifications-model/post-notifications/post-notifications.module';
import { CompanyImagesModule } from './models/company-models/company-images/company-images.module';
import { KeywordCategoriesModule } from './models/keyword-models/keyword-categories/keyword-categories.module';
import { KeywordDistrictsModule } from './models/keyword-models/keyword-districts/keyword-districts.module';
import { KeywordNotificationsModule } from './models/keyword-models/keyword-notifications/keyword-notifications.module';
import { TypeNotificationPlatformModule } from './models/keyword-models/type-notification-platform/type-notification-platform.module';
import { SiteModule } from './models/site/site.module';

@Module({
  imports: [

    AppConfigModule,
    DatabaseConfigModule,
    UserModule,
    MailModule, 
    QueueModule,
    AWSModule,
    AuthModule,
    JwtAccessTokenServiceModule,
    JwtRefreshTokenServiceModule,
    ProvincesModule,
    DistrictsModule,
    PostsModule,
    UserHistoriesModule,
    HotPostsModule,
    ChildrenModule,
    ParentModule,
    PostsCategoriesModule,
    PostsImagesModule,
    JobTypesModule,
    SalaryTypesModule,
    BookmarksModule,
    MulterConfigModule,
    CompaniesModule,
    CompanyRolesModule,
    CompanySizesModule,
    ProfilesModule,
    ProfilesCategoriesModule,
    ProfilesEducationsModule,
    ProfilesExperiencesModule,
    ProfilesLocationsModule,
    BannersModule,
    SearchModule,
    ApplicationsModule,
    HistoriesRecruiterModule,
    FcmTokensModule,
    FirebaseMessagingModule,
    PostNotificationsModule,
    CompanyImagesModule,
    KeywordCategoriesModule,
    KeywordDistrictsModule,
    KeywordNotificationsModule,
    TypeNotificationPlatformModule,
    SiteModule
  ],
  controllers: [AppController, BannersController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LanguageMiddleware)
      .forRoutes('*');
  }
}
