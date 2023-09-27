import { Injectable } from '@nestjs/common';
import { CreateCandidateBookmarkDto } from './dto/create-candidate-bookmark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateBookmark } from './entities/candidate-bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateBookmarksService {
  constructor(
    @InjectRepository(CandidateBookmark)
    private readonly candidateBooKmarkedRepository: Repository<CandidateBookmark>,
  ) {}
  async createCandidateBookmarked(
    createCandidateBookmarkDto: CreateCandidateBookmarkDto,
  ) {
    try {
      const bookmarked = await this.candidateBooKmarkedRepository.findOne({
        where: {
          candidateId: createCandidateBookmarkDto.candidateId,
          recruitId: createCandidateBookmarkDto.recruitId,
        },
      });

      if (bookmarked) {
        await this.candidateBooKmarkedRepository.delete({
          candidateId: createCandidateBookmarkDto.candidateId,
          recruitId: createCandidateBookmarkDto.recruitId,
        });
        return;
      }

      const newCandidateBookmarked = this.candidateBooKmarkedRepository.create({
        candidateId: createCandidateBookmarkDto.candidateId,
        recruitId: createCandidateBookmarkDto.recruitId,
      });

      return await this.candidateBooKmarkedRepository.save(
        newCandidateBookmarked,
      );
    } catch (error) {
      throw error;
    }
  }
}
