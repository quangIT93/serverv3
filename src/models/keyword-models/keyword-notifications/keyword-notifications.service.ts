import { Injectable } from '@nestjs/common';
import { CreateKeywordNotificationDto } from './dto/create-keyword-notification.dto';
import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';

@Injectable()
export class KeywordNotificationsService {
  create(_createKeywordNotificationDto: CreateKeywordNotificationDto) {
    return 'This action adds a new keywordNotification';
  }

  findAll() {
    return `This action returns all keywordNotifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keywordNotification`;
  }

  update(id: number, _updateKeywordNotificationDto: UpdateKeywordNotificationDto) {
    return `This action updates a #${id} keywordNotification`;
  }

  remove(id: number) {
    return `This action removes a #${id} keywordNotification`;
  }
}
