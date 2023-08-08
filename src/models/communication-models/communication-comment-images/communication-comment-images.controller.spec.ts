import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationCommentImagesController } from './communication-comment-images.controller';
import { CommunicationCommentImagesService } from './communication-comment-images.service';

describe('CommunicationCommentImagesController', () => {
  let controller: CommunicationCommentImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationCommentImagesController],
      providers: [CommunicationCommentImagesService],
    }).compile();

    controller = module.get<CommunicationCommentImagesController>(CommunicationCommentImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
