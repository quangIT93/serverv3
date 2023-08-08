import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationCommentsController } from './communication-comments.controller';
import { CommunicationCommentsService } from './communication-comments.service';

describe('CommunicationCommentsController', () => {
  let controller: CommunicationCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationCommentsController],
      providers: [CommunicationCommentsService],
    }).compile();

    controller = module.get<CommunicationCommentsController>(CommunicationCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
