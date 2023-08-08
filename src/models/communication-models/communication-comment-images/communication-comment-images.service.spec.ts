import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationCommentImagesService } from './communication-comment-images.service';

describe('CommunicationCommentImagesService', () => {
  let service: CommunicationCommentImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationCommentImagesService],
    }).compile();

    service = module.get<CommunicationCommentImagesService>(CommunicationCommentImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
