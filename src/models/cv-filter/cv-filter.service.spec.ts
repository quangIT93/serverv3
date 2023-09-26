import { Test, TestingModule } from '@nestjs/testing';
import { CvFilterService } from './cv-filter.service';

describe('CvFilterService', () => {
  let service: CvFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvFilterService],
    }).compile();

    service = module.get<CvFilterService>(CvFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
