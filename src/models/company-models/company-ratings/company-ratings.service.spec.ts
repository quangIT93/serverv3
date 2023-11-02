import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRatingsService } from './company-ratings.service';

describe('CompanyRatingsService', () => {
  let service: CompanyRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRatingsService],
    }).compile();

    service = module.get<CompanyRatingsService>(CompanyRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
