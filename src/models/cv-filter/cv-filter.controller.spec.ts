import { Test, TestingModule } from '@nestjs/testing';
import { CvFilterController } from './cv-filter.controller';
import { CvFilterService } from './cv-filter.service';

describe('CvFilterController', () => {
  let controller: CvFilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvFilterController],
      providers: [CvFilterService],
    }).compile();

    controller = module.get<CvFilterController>(CvFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
