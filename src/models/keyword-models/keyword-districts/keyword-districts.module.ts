import { Module } from '@nestjs/common';
import { KeywordDistrictsService } from './keyword-districts.service';
import { KeywordDistricsController } from './keyword-districs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordDistrict } from './entities/keyword-districts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeywordDistrict])
  ],
  controllers: [KeywordDistricsController],
  providers: [KeywordDistrictsService],
  exports: [KeywordDistrictsService]
})
export class KeywordDistrictsModule {}
