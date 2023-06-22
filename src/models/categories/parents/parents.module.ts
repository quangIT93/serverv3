import { Module } from '@nestjs/common';
import { ParentService } from './parents.service';
import { ParentController } from './parents.controller';

@Module({
  controllers: [ParentController],
  providers: [ParentService]
})
export class ParentModule {}
