import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesCategoriesController } from './profiles-categories.controller';
import { ProfilesCategoriesService } from './profiles-categories.service';

describe('ProfilesCategoriesController', () => {
  let controller: ProfilesCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesCategoriesController],
      providers: [ProfilesCategoriesService],
    }).compile();

    controller = module.get<ProfilesCategoriesController>(ProfilesCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
