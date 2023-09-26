import { Module } from '@nestjs/common';
import { CvFilterService } from './cv-filter.service';
import { CvFilterController } from './cv-filter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profile-models/profiles/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [CvFilterController],
  providers: [CvFilterService],
})
export class CvFilterModule {}
