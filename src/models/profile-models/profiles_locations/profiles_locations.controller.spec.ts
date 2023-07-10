import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesLocationsController } from './profiles_locations.controller';

describe('ProfilesLocationsController', () => {
  let controller: ProfilesLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesLocationsController],
    }).compile();

    controller = module.get<ProfilesLocationsController>(ProfilesLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
