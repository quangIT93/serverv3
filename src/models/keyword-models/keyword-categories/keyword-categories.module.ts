import { Module } from '@nestjs/common';
import { KeywordCategoriesService } from './keyword-categories.service';

@Module({
  providers: [KeywordCategoriesService]
})
export class KeywordCategoriesModule {}
