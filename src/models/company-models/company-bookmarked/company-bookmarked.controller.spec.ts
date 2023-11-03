import { Test, TestingModule } from '@nestjs/testing';
import { CompanyBookmarkedController } from './company-bookmarked.controller';
import { CompanyBookmarkedService } from './company-bookmarked.service';

describe('CompanyBookmarkedController', () => {
  let controller: CompanyBookmarkedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyBookmarkedController],
      providers: [CompanyBookmarkedService],
    }).compile();

    controller = module.get<CompanyBookmarkedController>(CompanyBookmarkedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
