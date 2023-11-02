import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRatingsController } from './company-ratings.controller';
import { CompanyRatingsService } from './company-ratings.service';

describe('CompanyRatingsController', () => {
  let controller: CompanyRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyRatingsController],
      providers: [CompanyRatingsService],
    }).compile();

    controller = module.get<CompanyRatingsController>(CompanyRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
