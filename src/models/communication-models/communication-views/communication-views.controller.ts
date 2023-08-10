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
  ParseIntPipe,
} from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CommunicationViewInterceptor } from './interceptors/communication-views.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('communication-views')
@Controller('communication-views')
export class CommunicationViewsController {
  constructor(
    private readonly communicationViewsService: CommunicationViewsService,
  ) {}

  @Post()
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

  @Get('count/:id')
  @UseGuards(AuthGuard)
  async countCommunicationLike(@Param('id', ParseIntPipe) id: number) {
    try {
      return {
        status: HttpStatus.OK,
        total : await this.communicationViewsService.countCommunicationViews(id)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error find all communication likes');
    }
  }
}
