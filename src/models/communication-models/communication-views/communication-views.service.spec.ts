import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationViewsService } from './communication-views.service';

describe('CommunicationViewsService', () => {
  let service: CommunicationViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunicationViewsService],
    }).compile();

    service = module.get<CommunicationViewsService>(CommunicationViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
