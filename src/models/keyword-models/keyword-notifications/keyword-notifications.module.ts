import { Module } from '@nestjs/common';
import { KeywordNotificationsService } from './keyword-notifications.service';
import { KeywordNotificationsController } from './keyword-notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordNotification } from './entities/keyword-notification.entity';
import { KeywordDistrictsModule } from '../keyword-districts/keyword-districts.module';
import { KeywordCategoriesModule } from '../keyword-categories/keyword-categories.module';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateKeywordTransaction, UpdateKeywordTransaction } from './transactions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KeywordNotification
    ]),
    KeywordDistrictsModule,
    KeywordCategoriesModule,
    AuthModule,
    JwtAccessTokenServiceModule
  ],
  controllers: [KeywordNotificationsController],
  providers: [KeywordNotificationsService, CreateKeywordTransaction, UpdateKeywordTransaction]
})
export class KeywordNotificationsModule {}
