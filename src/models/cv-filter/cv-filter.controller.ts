import { Controller } from '@nestjs/common';
import { CvFilterService } from './cv-filter.service';

@Controller('cv-filter')
export class CvFilterController {
  constructor(private readonly cvFilterService: CvFilterService) {}
}
