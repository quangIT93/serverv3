import { Test, TestingModule } from '@nestjs/testing';
import { CompanyBookmarkedService } from './company-bookmarked.service';

describe('CompanyBookmarkedService', () => {
  let service: CompanyBookmarkedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyBookmarkedService],
    }).compile();

    service = module.get<CompanyBookmarkedService>(CompanyBookmarkedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
