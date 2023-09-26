import { Injectable } from '@nestjs/common';
import { CreateCadidateBookmarkDto } from './dto/create-cadidate-bookmark.dto';
import { UpdateCadidateBookmarkDto } from './dto/update-cadidate-bookmark.dto';

@Injectable()
export class CadidateBookmarksService {
  create(_createCadidateBookmarkDto: CreateCadidateBookmarkDto) {
    return 'This action adds a new cadidateBookmark';
  }

  findAll() {
    return `This action returns all cadidateBookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cadidateBookmark`;
  }

  update(id: number, _updateCadidateBookmarkDto: UpdateCadidateBookmarkDto) {
    return `This action updates a #${id} cadidateBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} cadidateBookmark`;
  }
}
