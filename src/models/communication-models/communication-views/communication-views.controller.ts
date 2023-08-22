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
import { ApiBasicAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';

@ApiTags('Communication-views')
@Controller('communication-views')
export class CommunicationViewsController {
  constructor(
    private readonly communicationViewsService: CommunicationViewsService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBasicAuth()
  @UseGuards(AuthNotRequiredGuard)
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
