import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesLocationsService } from './profiles_locations.service';

describe('ProfilesLocationsService', () => {
  let service: ProfilesLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesLocationsService],
    }).compile();

    service = module.get<ProfilesLocationsService>(ProfilesLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
