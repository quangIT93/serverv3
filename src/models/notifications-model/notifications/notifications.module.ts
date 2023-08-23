import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [
    JwtAccessTokenServiceModule,
    AuthModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
