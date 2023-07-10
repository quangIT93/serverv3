import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesExperiencesController } from './profiles_experiences.controller';

describe('ProfilesExperiencesController', () => {
  let controller: ProfilesExperiencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesExperiencesController],
    }).compile();

    controller = module.get<ProfilesExperiencesController>(ProfilesExperiencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
