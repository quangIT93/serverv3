import { BadRequestException, Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { CvFilterService } from './cv-filter.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterCandidatesDto } from './dto/filter-candidates.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('cv-filter')
@ApiTags('CV filter')
export class CvFilterController {
  constructor(private readonly cvFilterService: CvFilterService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async filterCandidatesWithCondition(@Query() query: FilterCandidatesDto, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id

      if (!accountId) {
        throw new BadRequestException('User not found')
      }
      return await this.cvFilterService.filterCandidatesWithCondition(query)

    } catch (error) {
     if (error instanceof Error) {
      throw new BadRequestException(error.message)
     }
     throw new BadRequestException('Error getting')
    }
  }

}
