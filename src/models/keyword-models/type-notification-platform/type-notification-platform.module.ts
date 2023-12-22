import { Module } from '@nestjs/common';
import { TypeNotificationPlatformService } from './type-notification-platform.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeNotificationPlatform } from './entities/type-notification-platform.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { ProfilesModule } from 'src/models/profile-models/profiles/profiles.module';
import { FcmTokensModule } from 'src/models/fcm-tokens/fcm-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeNotificationPlatform]),
    JwtModule,
    JwtAccessTokenModule,
    ProfilesModule,
    FcmTokensModule
  ],
  controllers: [],
  providers: [TypeNotificationPlatformService],
  exports: [TypeNotificationPlatformService]
})
export class TypeNotificationPlatformModule {}
