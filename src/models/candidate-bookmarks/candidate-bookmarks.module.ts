import { Module } from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CandidateBookmarksController } from './candidate-bookmarks.controller';

@Module({
  controllers: [CandidateBookmarksController],
  providers: [CandidateBookmarksService]
})
export class CandidateBookmarksModule {}
