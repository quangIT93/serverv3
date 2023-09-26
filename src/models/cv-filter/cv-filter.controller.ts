import { Controller, Get, Query } from '@nestjs/common';
import { CvFilterService } from './cv-filter.service';
import { ApiTags } from '@nestjs/swagger';
import { FilterCandidatesDto } from './dto/filter-candidates.dto';

@Controller('cv-filter')
@ApiTags('CV filter')
export class CvFilterController {
  constructor(private readonly cvFilterService: CvFilterService) {}

  @Get('search')
  filterCandidatesWithCondition(@Query() query: FilterCandidatesDto) {
    return this.cvFilterService.filterCandidatesWithCondition(query);
  }
}
