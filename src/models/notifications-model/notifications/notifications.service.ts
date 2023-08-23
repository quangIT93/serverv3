import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './repository/notification.repository';
import { DataSource } from 'typeorm';
// import { CreateNotificationDto } from './dto/create-notification.dto';
// import { UpdateNotificationDto } from './dto/update-notification.dto';


@Injectable()
export class NotificationsService {
  constructor(
    private readonly dataSource: DataSource
  ) {}
  // create(_reateNotificationDto: CreateNotificationDto) {
  //   return 'This action adds a new notification';
  // }


  findAll() {
    return new NotificationRepository(
      this.dataSource
    ).findAll();
  }

  findAllByAccountId(accountId: string) {
    return new NotificationRepository(
      this.dataSource
    ).findAllByAccountId(accountId);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} notification`;
  // }

  // update(id: number, _updateNotificationDto: UpdateNotificationDto) {
  //   return `This action updates a #${id} notification`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} notification`;
  // }
}
