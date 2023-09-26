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
import { ProfilesService } from '../profile-models/profiles/profiles.service';

@Controller('candidate-bookmarks')
@ApiTags('candidate-bookmarked')
export class CandidateBookmarksController {
  constructor(
    private readonly candidateBookmarksService: CandidateBookmarksService,
    private readonly profileService: ProfilesService,
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

      const candidate = await this.profileService.findOne(
        createCandidateBookmarkDto.candidate,
      );

      if (!candidate) {
        throw new BadRequestException('Candidate not found');
      }

      createCandidateBookmarkDto.recruit = accountId;

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
      throw new BadRequestException('Error getting');
    }
  }
}
