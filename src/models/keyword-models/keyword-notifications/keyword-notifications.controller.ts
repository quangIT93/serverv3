import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { KeywordNotificationsService } from './keyword-notifications.service';
import { CreateKeywordNotificationDto } from './dto/create-keyword-notification.dto';
// import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';

@Controller('keyword-notifications')
export class KeywordNotificationsController {
  constructor(
    private readonly keywordNotificationsService: KeywordNotificationsService,
  ) {}

  /**
   * 
   * @param createKeywordNotificationDto 
   * @returns new keyword notification
   * 
   * @description
   * This method is used to create a new keyword notification.
   * 1. Create keyword in keyword table
   * 2. Create keyword district in keyword district table
   * 3. Create keyword category in keyword category table
   * 
   * If have any error, it will throw an error and rollback all queries.
   */
  @Post()
  create(@Body() createKeywordNotificationDto: CreateKeywordNotificationDto) {
    return this.keywordNotificationsService.create(
      createKeywordNotificationDto,
    );
  }

  /**
   * Get all keyword notifications by account id
   */
  @Get()
  findAll() {
    return this.keywordNotificationsService.findAll();
  }

  /**
   * Update keyword notification
   */
  @Patch()
  update() {
    // return this.keywordNotificationsService.update();
  }

}
