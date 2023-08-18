import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  HttpStatus,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CommunicationViewInterceptor } from './interceptors/communication-views.interceptor';
import { ApiBasicAuth, ApiParam, ApiTags } from '@nestjs/swagger';

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

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @UseInterceptors(ClassSerializerInterceptor, CommunicationViewInterceptor)
  async findOne(@Param('id') id: number) {
    try {
      return await this.communicationViewsService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error find all communication views');
    }
  }

}
