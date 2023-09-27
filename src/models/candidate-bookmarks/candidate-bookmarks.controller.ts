import {
  Controller,
  Post,
  Body,
  Req,
  BadRequestException,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CandidateBookmarksService } from './candidate-bookmarks.service';
import { CreateCandidateBookmarkDto } from './dto/create-candidate-bookmark.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('candidate-bookmarks')
@ApiTags('Candidate Bookmarked')
export class CandidateBookmarksController {
  constructor(
    private readonly candidateBookmarksService: CandidateBookmarksService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createCandidateBookmarkDto: CreateCandidateBookmarkDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      createCandidateBookmarkDto.recruitId = accountId;

      const data =
        await this.candidateBookmarksService.createCandidateBookmarked(
          createCandidateBookmarkDto,
        );

      if (data) {
        return {
          status: HttpStatus.CREATED,
          data,
        };
      }

      return {
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating candidate bookmark');
    }
  }
}
