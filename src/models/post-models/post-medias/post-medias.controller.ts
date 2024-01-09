import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostMediasService } from './post-medias.service';
import { CreatePostMediaDto } from './dto/create-post-media.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { PagingDto } from 'src/common/dtos/paging.dto';
import { UpdatePostMediaDto } from './dto/update-post-media.dto';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { RoleGuard } from 'src/authentication/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostMediaImagePipe } from './interceptors/image-post-media.interceptor';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_POST_UPLOAD } from 'src/common/constants';
import { PostMediasInterceptor } from './interceptors/post-medias.interceptor';
import { PostMediaDetailInterceptor } from './interceptors/post-media-detail.interceptor';

@ApiTags('Post-medias')
@Controller('post-medias')
export class PostMediasController {
  constructor(
    private readonly postMediasService: PostMediasService,
    private readonly awsService: AWSService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', { limits: { fieldSize: 1024 * 1024 * 6 } }),
  )
  async create(
    @Req() req: CustomRequest,
    @Body() body: CreatePostMediaDto,
    @UploadedFile(PostMediaImagePipe) image: Express.Multer.File,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      if (image) {
        await this.awsService.uploadFile(image, {
          BUCKET: BUCKET_IMAGE_POST_UPLOAD,
          id: body.postId,
        });
        body.image = image.originalname;
      }

      await this.postMediasService.create(accountId, body);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create company rated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Posting error');
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, PostMediasInterceptor)
  async findAll(@Query() query: PagingDto) {
    try {
      return await this.postMediasService.findAll(query);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }
  @Get('/by-admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor, PostMediasInterceptor)
  async findAllByAdmin() {
    try {
      return await this.postMediasService.findAllByAdmin();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.postMediasService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }
  @Get('/post/:id')
  @UseInterceptors(ClassSerializerInterceptor, PostMediaDetailInterceptor)
  async findOneByPost(@Param('id') id: number) {
    try {
      return await this.postMediasService.findOneByPost(id);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', { limits: { fieldSize: 1024 * 1024 * 6 } }),
  )
  async update(
    @Req() req: CustomRequest,
    @Param('id') id: number,
    @Body() body: UpdatePostMediaDto,
    @UploadedFile(PostMediaImagePipe) image: Express.Multer.File,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      if (image) {
        await this.awsService.uploadFile(image, {
          BUCKET: BUCKET_IMAGE_POST_UPLOAD,
          id: body.postId,
        });
        body.image = image.originalname;
      }

      await this.postMediasService.update(id, body);
      return {
        statusCode: HttpStatus.OK,
        message: 'Post media updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Putting error');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: number) {
    try {
      await this.postMediasService.delete(id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Post media deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Deleting error');
    }
  }
}
