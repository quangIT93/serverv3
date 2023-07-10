import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesCategoriesService } from './profiles-categories.service';

describe('ProfilesCategoriesService', () => {
  let service: ProfilesCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesCategoriesService],
    }).compile();

    service = module.get<ProfilesCategoriesService>(ProfilesCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
