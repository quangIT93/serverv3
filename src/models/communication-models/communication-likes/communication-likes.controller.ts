import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  HttpStatus,
  ParseIntPipe,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CommunicationLikesService } from './communication-likes.service';
import { CreateCommunicationLikeDto } from './dto/create-communication-like.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiTags } from '@nestjs/swagger';
import { CommunicationLikeInterceptor } from './interceptors/communication-likes.interceptor';

@ApiTags('communication-likes')
@Controller('communication-likes')
export class CommunicationLikesController {
  constructor(
    private readonly communicationLikesService: CommunicationLikesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrDelete(
    @Body() createCommunicationLikeDto: CreateCommunicationLikeDto,
    @Req() req: CustomRequest,
  ) {
    createCommunicationLikeDto.accountId = req.user?.id ? req.user.id : '';
    return {
      status: HttpStatus.CREATED,
      data: await this.communicationLikesService.createOrDelete(
        createCommunicationLikeDto,
      ),
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CommunicationLikeInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.communicationLikesService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error find all communication likes');
    }
  }

  // @Get('count/:id')
  // @UseGuards(AuthGuard)
  // async countCommunicationLike(@Param('id', ParseIntPipe) id: number) {
  //   try {
  //     return {
  //       status: HttpStatus.OK,
  //       total: await this.communicationLikesService.countCommunicationLikes(id),
  //     };
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new BadRequestException(error.message);
  //     }
  //     throw new BadRequestException('Error find all communication likes');
  //   }
  // }
}
