import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationCommentsService } from './communication-comments.service';

describe('CommunicationCommentsService', () => {
  let service: CommunicationCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationCommentsService],
    }).compile();

    service = module.get<CommunicationCommentsService>(CommunicationCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
