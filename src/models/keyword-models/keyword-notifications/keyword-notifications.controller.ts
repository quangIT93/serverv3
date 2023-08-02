import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { KeywordNotificationsService } from './keyword-notifications.service';
import { CreateKeywordNotificationDto } from './dto/create-keyword-notification.dto';
import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';
import { ApiTags } from '@nestjs/swagger';
// import { UpdateKeywordNotificationDto } from './dto/update-keyword-notification.dto';

@ApiTags('keyword-notifications')
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
  async create(@Body() createKeywordNotificationDto: CreateKeywordNotificationDto) {
    try {
      await this.keywordNotificationsService.create(
        createKeywordNotificationDto,
      );

      return {
        status: HttpStatus.OK,
        message: 'Create keyword notification successfully'
      }
    } catch (error) {
      throw new Error('Error')
    }
  }

  /**
   * Get all keyword notifications by account id
   */
  @Get(':id')
  async findAll(@Param('id') id : string) {
    try {
      return {
        status: HttpStatus.OK,
        data: await this.keywordNotificationsService.findAll(id)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('Error finding keyword notification')
      }
  }

  /**
   * Update keyword notification
   */
  @Put(":id")
  async update(@Param('id') id : number, @Body() updateKeywordNotificationDto: UpdateKeywordNotificationDto) {
    try {
      await this.keywordNotificationsService.update(id, updateKeywordNotificationDto);
      return {
        status: HttpStatus.OK,
        message: 'Updated keyword notification successfully'
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('Error update keyword notification')
      }
    }
  }

