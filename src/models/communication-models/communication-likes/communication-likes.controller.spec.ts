import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationLikesController } from './communication-likes.controller';
import { CommunicationLikesService } from './communication-likes.service';

describe('CommunicationLikesController', () => {
  let controller: CommunicationLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationLikesController],
      providers: [CommunicationLikesService],
    }).compile();

    controller = module.get<CommunicationLikesController>(CommunicationLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
