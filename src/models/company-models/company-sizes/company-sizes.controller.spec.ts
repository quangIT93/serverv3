import { Test, TestingModule } from '@nestjs/testing';
import { CompanySizesController } from './company-sizes.controller';
import { CompanySizesService } from './company-sizes.service';

describe('CompanySizesController', () => {
  let controller: CompanySizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySizesController],
      providers: [CompanySizesService],
    }).compile();

    controller = module.get<CompanySizesController>(CompanySizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
