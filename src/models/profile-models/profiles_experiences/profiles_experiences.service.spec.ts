import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesExperiencesService } from './profiles_experiences.service';

describe('ProfilesExperiencesService', () => {
  let service: ProfilesExperiencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesExperiencesService],
    }).compile();

    service = module.get<ProfilesExperiencesService>(ProfilesExperiencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
