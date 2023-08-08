import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationLikesService } from './communication-likes.service';

describe('CommunicationLikesService', () => {
  let service: CommunicationLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationLikesService],
    }).compile();

    service = module.get<CommunicationLikesService>(CommunicationLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
