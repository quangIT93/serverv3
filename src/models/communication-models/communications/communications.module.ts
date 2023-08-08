import { Module } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CommunicationsController } from './communications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Communication
    ])
  ],
  controllers: [CommunicationsController],
  providers: [CommunicationsService]
})
export class CommunicationsModule {}
