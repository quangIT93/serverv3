import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { CommunicationImagesService } from './communication-images.service';
import { CreateCommunicationImageDto } from './dto/create-communication-image.dto';
import { UpdateCommunicationImageDto } from './dto/update-communication-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';
import { ImageCommunicationPipe } from './interceptors/image-communication.interceptor';

@Controller('communication-images')
export class CommunicationImagesController {
  constructor(
    private readonly communicationImagesService: CommunicationImagesService,
    private readonly awsService: AWSService,
  ) {}

  @Post()
  create(@Body() createCommunicationImageDto: CreateCommunicationImageDto[]) {
    return this.communicationImagesService.createMany(
      createCommunicationImageDto,
    );
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('files[0]', { limits: { fieldSize: 1024 * 1024 * 6 } }),
  )
  async updateLoadImage(@UploadedFile(ImageCommunicationPipe) file: any) {
    try {
      const uploadImage = await this.awsService.uploadFile(file, {
        BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Update avatar successfully',
        data: uploadImage.Location,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Error posting');
    }
  }

  @Get()
  findAll() {
    return this.communicationImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunicationImageDto: UpdateCommunicationImageDto,
  ) {
    return this.communicationImagesService.update(
      +id,
      updateCommunicationImageDto,
    );
  }
}
