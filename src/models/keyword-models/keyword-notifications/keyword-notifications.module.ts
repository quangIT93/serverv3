import { Module } from '@nestjs/common';
import { KeywordNotificationsService } from './keyword-notifications.service';
import { KeywordNotificationsController } from './keyword-notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordNotification } from './entities/keyword-notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KeywordNotification
    ])
  ],
  controllers: [KeywordNotificationsController],
  providers: [KeywordNotificationsService]
})
export class KeywordNotificationsModule {}
