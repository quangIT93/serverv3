// import { TypeOrmExModule } from './../../database/typeorm-ex.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { JwtAccessTokenServiceModule } from "src/providers/jwt/atk.provider.module";
import { BookmarksModule } from "src/models/bookmarks/bookmarks.module";
// import { BookmarksService } from "src/models/bookmarks/bookmarks.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        JwtAccessTokenServiceModule,
        BookmarksModule,
    ],
    controllers: [PostsController],
    providers: [
        PostsService,
    ],
    exports: [
        PostsService,
    ],
})

export class PostsModule { }