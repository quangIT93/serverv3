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
import { CommunicationsModule } from './models/communication-models/communications/communications.module';
import { CommunicationCategoriesModule } from './models/communication-models/communication-categories/communication-categories.module';
import { CommunicationImagesModule } from './models/communication-models/communication-images/communication-images.module';
import { CommunicationCommentImagesModule } from './models/communication-models/communication-comment-images/communication-comment-images.module';
import { CommunicationBookmarkedModule } from './models/communication-models/communication-bookmarked/communication-bookmarked.module';
import { CommunicationViewsModule } from './models/communication-models/communication-views/communication-views.module';
import { AdminModule } from './models/admin/admin.module';
import { MailLoggerModule } from './models/log/mail-logger/mail-logger.module';
import { ProfilesSkillsModule } from './models/profile-models/profiles-skills/profiles-skills.module';
import { LevelTypeModule } from './models/profile-models/types/level-type/level-types.module';
import { ProfileLanguagesModule } from './models/profile-models/profile-languages/profile-languages.module';
import { LanguageTypesModule } from './models/profile-models/types/language-types/language-types.module';
import { ProfilesReferencesModule } from './models/profile-models/profiles-references/profiles-references.module';
import { ProfilesCoursesModule } from './models/profile-models/profiles-courses/profiles-courses.module';
import { ProfilesActivitiesModule } from './models/profile-models/profiles-activities/profiles-activities.module';
import { ProfilesIntershipsModule } from './models/profile-models/profiles-interships/profiles-interships.module';
import { ProfilesAwardsModule } from './models/profile-models/profiles-awards/profiles-awards.module';
import { ProfilesHobbiesModule } from './models/profile-models/profiles-hobbies/profiles_hobbies.module';
import { ProfilesCvsModule } from './models/profile-models/profiles-cvs/profiles_cvs.module';
import { CvTemplateModule } from './models/cv-template/cv-template.module';
import { CvFilterModule } from './models/cv-filter/cv-filter.module';
import { AcademicTypesModule } from './models/academic_types/academic_types.module';
import { CandidateBookmarksModule } from './models/candidate-bookmarks/candidate-bookmarks.module';
import { ViewProfilesModule } from './models/view_profiles/view_profiles.module';
import { AppLoggerMiddleware } from './common/middlewares/logger/app.log';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './throttlerBehindProxyGuard.guard';
import { CompanyRatingsModule } from './models/company-models/company-ratings/company-ratings.module';
import { CompanyBookmarkedModule } from './models/company-models/company-bookmarked/company-bookmarked.module';
// import { GoogleMapProvider } from './models/site/google-map.provider';
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

    // Company Module
    CompaniesModule,
    CompanyRolesModule,
    CompanySizesModule,
    CompanyRatingsModule,
    CompanyBookmarkedModule,

    // Profile Module
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
    SiteModule,

    // Communication Module
    CommunicationsModule,
    CommunicationCategoriesModule,
    CommunicationImagesModule,
    CommunicationCommentImagesModule,
    CommunicationBookmarkedModule,
    CommunicationViewsModule,

    //admin
    AdminModule,

    MailLoggerModule,

    // Profiles
    LevelTypeModule,
    ProfilesSkillsModule,
    ProfileLanguagesModule,
    LanguageTypesModule,
    ProfilesReferencesModule,
    ProfilesCoursesModule,
    ProfilesActivitiesModule,
    ProfilesIntershipsModule,
    ProfilesAwardsModule,
    ProfilesHobbiesModule,
    ProfilesCvsModule,
    CvTemplateModule,
    CvFilterModule,
    AcademicTypesModule,
    CandidateBookmarksModule,
    ViewProfilesModule,

    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3000,
      },
      // {
      //   name: 'medium',
      //   ttl: 10000,
      //   limit: 20
      // },
      // {
      //   name: 'long',
      //   ttl: 60000,
      //   limit: 100
      // },
    ]),
  ],
  controllers: [AppController, BannersController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useValue: ThrottlerBehindProxyGuard,
    },
    // GoogleMapProvider,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
