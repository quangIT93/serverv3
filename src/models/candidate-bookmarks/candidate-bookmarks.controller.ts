import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CreateCandidateBookmarkDto } from './dto/create-candidate-bookmark.dto';
import { UpdateCandidateBookmarkDto } from './dto/update-candidate-bookmark.dto';

@Controller('candidate-bookmarks')
export class CandidateBookmarksController {
  constructor(private readonly candidateBookmarksService: CandidateBookmarksService) {}

  @Post()
  create(@Body() createCandidateBookmarkDto: CreateCandidateBookmarkDto) {
    return this.candidateBookmarksService.create(createCandidateBookmarkDto);
  }

  @Get()
  findAll() {
    return this.candidateBookmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateBookmarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateBookmarkDto: UpdateCandidateBookmarkDto) {
    return this.candidateBookmarksService.update(+id, updateCandidateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateBookmarksService.remove(+id);
  }
}
