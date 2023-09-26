import { Injectable } from '@nestjs/common';
import { CreateCandidateBookmarkDto } from './dto/create-candidate-bookmark.dto';
import { UpdateCandidateBookmarkDto } from './dto/update-candidate-bookmark.dto';

@Injectable()
export class CandidateBookmarksService {
  create(_createCandidateBookmarkDto: CreateCandidateBookmarkDto) {
    return 'This action adds a new candidateBookmark';
  }

  findAll() {
    return `This action returns all candidateBookmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidateBookmark`;
  }

  update(id: number, _updateCandidateBookmarkDto: UpdateCandidateBookmarkDto) {
    return `This action updates a #${id} candidateBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidateBookmark`;
  }
}
