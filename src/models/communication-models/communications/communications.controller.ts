import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  UploadedFiles,
  BadRequestException,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CommunicationImagesPipe } from './interceptors/image.interceptor';
import { CommunicationInterceptor } from './interceptors/communication.interceptor';

@ApiTags('communications')
@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Post()
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 5 }], {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async create(
    @Body() createCommunicationDto: CreateCommunicationDto,
    @Req() req: CustomRequest,
    @Res() res: any,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: any | undefined,
  ) {
    try {
      const { images } = listImages;

      if (req.user?.id === undefined) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      createCommunicationDto.accountId = req.user?.id || '';
      createCommunicationDto.images = images

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Create communication successfully',
        data: await this.communicationsService.create(
          createCommunicationDto,
        ),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating communication');
    }
  }

  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;
      if (!id) {
        return null;
      }

      return await this.communicationsService.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication');
    }
  }

  @Get('by-accountId')
  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  @UseGuards(AuthGuard)
  async findOne(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id ? req.user?.id : '';
      if (id === '') {
        throw new BadRequestException('User not found');
      }

      return await this.communicationsService.findCommunicationById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication');
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor([{ name: 'images', maxCount: 5 }], {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: any | undefined,
    @Req() req: CustomRequest,
  ) {
    try {
      const { images } = listImages;
      updateCommunicationDto.id = id;
      updateCommunicationDto.accountId = req.user?.id;
      updateCommunicationDto.images = images
    
      await this.communicationsService.update(updateCommunicationDto);
      return {
        status: HttpStatus.OK,
        message: 'Updated communication successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update communication');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: number,
    @Req() req: CustomRequest,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
  ) {
    updateCommunicationDto.accountId = req.user?.id ? req.user.id : '';
    updateCommunicationDto.id = id;
    await this.communicationsService.remove(updateCommunicationDto);
    return {
      status: HttpStatus.OK,
      message: 'Delete communication successfully',
    };
  }

  @Get('by-name')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  async getByName(@Req() req: any) {
    try {
      const search = req.query.search;
      return await this.communicationsService.searchCommunication(search);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error search communication');
    }
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  async getByCommunicationId(@Param('id') id: string) {
    try {
      return await this.communicationsService.getCommunicationByCommunicationId(
        +id,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error find communication by communicationId',
      );
    }
  }
}
