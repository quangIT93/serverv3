import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpStatus,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CommunicationBookmarkedService } from './communication-bookmarked.service';
// import { CreateCommunicationBookmarkedDto } from './dto/create-communication-bookmarked.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CreateCommunicationBookmarkedDto } from './dto/create-communication-bookmarked.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CommunicationBookmarkedInterceptor } from './interceptors/communication-bookmarked.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Communication-bookmarked')
@Controller('communication-bookmarked')
export class CommunicationBookmarkedController {
  constructor(
    private readonly communicationBookmarkedService: CommunicationBookmarkedService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() req: CustomRequest,
    @Body() createCommunicationBookmarkedDto: CreateCommunicationBookmarkedDto,
  ) {
    try {
      if (!req.user?.id) {
        throw new BadRequestException('Authorization');
      }
      createCommunicationBookmarkedDto.accountId = req.user?.id;
      return {
        status: HttpStatus.CREATED,
        data: await this.communicationBookmarkedService.create(
          createCommunicationBookmarkedDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error create communication bookmarked');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    CommunicationBookmarkedInterceptor,
  )
  async findOne(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) throw new BadRequestException('Authorization');

      return await this.communicationBookmarkedService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error find communication bookmarked');
    }
  }
}
