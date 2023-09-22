import { Module } from '@nestjs/common';
import { CvFilterService } from './cv-filter.service';
import { CvFilterController } from './cv-filter.controller';

@Module({
  controllers: [CvFilterController],
  providers: [CvFilterService]
})
export class CvFilterModule {}
