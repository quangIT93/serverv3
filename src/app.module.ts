import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './providers/database/mariadb/provider.module';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './models/users/users.module';
import { MailModule } from './providers/mail/provider.module';
import { QueueModule } from './providers/queue/provider.module';
// import { JwtConfigModule } from './config/jwt/config.module';
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
import { CompanyResourcesModule } from './models/company-resources/company-resources.module';
import { PostResourceModule } from './models/post-models/post-resource/post-resource.module';
import { BookmarksModule } from './models/bookmarks/bookmarks.module';
import { AWSConfigModule } from './config/storage/aws/config.module';
import { MulterConfigModule } from './providers/storage/multer/provider.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseConfigModule,
    UserModule,
    MailModule, 
    QueueModule,
    AWSConfigModule,
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
    CompanyResourcesModule,
    PostResourceModule,
    BookmarksModule,
    MulterConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LanguageMiddleware)
      .forRoutes('*');
  }
}
