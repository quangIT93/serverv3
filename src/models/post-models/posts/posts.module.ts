// import { TypeOrmExModule } from './../../database/typeorm-ex.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { JwtAccessTokenServiceModule } from "src/providers/jwt/atk.provider.module";
import { BookmarksModule } from "src/models/bookmarks/bookmarks.module";
import { PageAndLimitMiddleware } from "src/common/middlewares/page-limit/page-limit.middleware";
import { AWSModule } from "src/providers/storage/aws/provider.module";
import { PostsImagesModule } from "../posts-images/posts-images.module";
import { PostResourceModule } from "../post-resource/post-resource.module";
import { PostsCategoriesModule } from "../posts-categories/posts-categories.module";
import { ApplicationsModule } from "src/models/application-model/applications/applications.module";
// import { BookmarksService } from "src/models/bookmarks/bookmarks.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        JwtAccessTokenServiceModule,
        BookmarksModule,
        AWSModule,
        PostsImagesModule,
        PostResourceModule,
        PostsCategoriesModule,
        ApplicationsModule,
    ],
    controllers: [
        PostsController,
    ],
    providers: [
        PostsService,
    ],
    exports: [
        PostsService,
    ],
})

export class PostsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(PageAndLimitMiddleware)
            .exclude(
                { path: 'posts/:id', method: RequestMethod.GET },
                { path: 'posts/:id', method: RequestMethod.PUT },
                { path: 'posts', method: RequestMethod.POST },
            )
            .forRoutes(PostsController)
            
    }
}