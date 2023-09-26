import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CadidateBookmarksService } from './cadidate-bookmarks.service';
import { CreateCadidateBookmarkDto } from './dto/create-cadidate-bookmark.dto';
import { UpdateCadidateBookmarkDto } from './dto/update-cadidate-bookmark.dto';

@Controller('cadidate-bookmarks')
export class CadidateBookmarksController {
  constructor(private readonly cadidateBookmarksService: CadidateBookmarksService) {}

  @Post()
  create(@Body() createCadidateBookmarkDto: CreateCadidateBookmarkDto) {
    return this.cadidateBookmarksService.create(createCadidateBookmarkDto);
  }

  @Get()
  findAll() {
    return this.cadidateBookmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cadidateBookmarksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCadidateBookmarkDto: UpdateCadidateBookmarkDto) {
    return this.cadidateBookmarksService.update(+id, updateCadidateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cadidateBookmarksService.remove(+id);
  }
}
