import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesEducationsController } from './profiles_educations.controller';

describe('ProfilesEducationsController', () => {
  let controller: ProfilesEducationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesEducationsController],
    }).compile();

    controller = module.get<ProfilesEducationsController>(ProfilesEducationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
