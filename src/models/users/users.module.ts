// import { TypeOrmExModule } from './../../database/typeorm-ex.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { User } from "./entities";
import { JwtAccessTokenModule } from "src/providers/jwt/atk.provider.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtAccessTokenModule
    ],
    controllers: [UserController],
    providers: [
        UserService,
    ],
    exports: [UserService],
})

export class UserModule { }