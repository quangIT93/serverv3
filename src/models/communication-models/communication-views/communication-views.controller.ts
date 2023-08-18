import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Communication-views')
@Controller('communication-views')
export class CommunicationViewsController {
  constructor(
    private readonly communicationViewsService: CommunicationViewsService,
  ) {}

  @Post()
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCommunicationViewDto: CreateCommunicationViewDto,
    @Req() req: CustomRequest,
  ) {
    createCommunicationViewDto.accountId = req.user?.id ? req.user.id : '';

    return {
      status: HttpStatus.CREATED,
      data: await this.communicationViewsService.create(
        createCommunicationViewDto,
      ),
    };
  }

}
