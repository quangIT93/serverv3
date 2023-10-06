import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { UnlockMiddleware } from 'src/common/middlewares/unclock/unlock.middleware';
import { UserModule } from 'src/models/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile
    ]),
    AuthModule,
    JwtAccessTokenServiceModule,
    AWSModule,
    UserModule
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService]
})
export class ProfilesModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UnlockMiddleware).forRoutes({ path: 'profiles/:id', method: RequestMethod.GET });
  }
}
