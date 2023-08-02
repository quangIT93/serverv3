import { Module } from '@nestjs/common';
import { KeywordDistrictsService } from './keyword-districts.service';

@Module({
  providers: [KeywordDistrictsService]
})
export class KeywordDistrictsModule {}
