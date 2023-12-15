import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PostViewsService } from './post-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostView } from './entities/post-view.entity';
import { PostViewsController } from './post-views.controller';
import { PageAndLimitMiddleware } from 'src/common/middlewares/page-limit/page-limit.middleware';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostView]),
    AuthModule,
    JwtAccessTokenModule
  ],
  controllers: [
    PostViewsController
  ],
  providers: [PostViewsService],
  exports: [PostViewsService],  
})
export class PostViewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(PageAndLimitMiddleware)
    .forRoutes(
      { path: 'post-views', method: RequestMethod.GET },
    )
  }
}
