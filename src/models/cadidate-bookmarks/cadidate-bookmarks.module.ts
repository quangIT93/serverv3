import { Module } from '@nestjs/common';
import { CadidateBookmarksService } from './cadidate-bookmarks.service';
import { CadidateBookmarksController } from './cadidate-bookmarks.controller';

@Module({
  controllers: [CadidateBookmarksController],
  providers: [CadidateBookmarksService]
})
export class CadidateBookmarksModule {}
