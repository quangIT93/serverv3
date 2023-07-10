import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesEducationsService } from './profiles_educations.service';

describe('ProfilesEducationsService', () => {
  let service: ProfilesEducationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesEducationsService],
    }).compile();

    service = module.get<ProfilesEducationsService>(ProfilesEducationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
