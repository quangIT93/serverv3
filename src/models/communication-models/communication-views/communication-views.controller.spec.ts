import { Test, TestingModule } from '@nestjs/testing';
import { CommunicationViewsController } from './communication-views.controller';
import { CommunicationViewsService } from './communication-views.service';

describe('CommunicationViewsController', () => {
  let controller: CommunicationViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunicationViewsController],
      providers: [CommunicationViewsService],
    }).compile();

    controller = module.get<CommunicationViewsController>(CommunicationViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
