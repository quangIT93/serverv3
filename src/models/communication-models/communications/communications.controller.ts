import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpStatus, UseInterceptors, ClassSerializerInterceptor, Res, UploadedFiles, BadRequestException } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CommunicationImagesPipe } from './interceptors/image.interceptor';

@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Post()
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async create(
    @Body() createCommunicationDto: CreateCommunicationDto,
    @Req() req: CustomRequest,
    @Res() res: any,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: any | undefined
    ) {
    try {
      const { images } = listImages

      if (req.user?.id === undefined) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      createCommunicationDto.accountId = req.user?.id || '';
      createCommunicationDto.images = images ? images.map((image: any) => image.originalname) : [];

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create keyword notification successfully',
        data : await this.communicationsService.create(images, createCommunicationDto)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating communication');
    }
  }

  @Get()
  findAll() {
    return this.communicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationsService.findCommunicationById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationDto: UpdateCommunicationDto) {
    return this.communicationsService.update(+id, updateCommunicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationsService.remove(+id);
  }
}
