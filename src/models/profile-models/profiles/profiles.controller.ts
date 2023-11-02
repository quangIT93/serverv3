import {
  Controller,
  Get,
  // Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
  Put,
  BadRequestException,
  HttpStatus,
  // UploadedFiles,
  // ParseFilePipeBuilder,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileDetailInterceptor } from './interceptor/profile-detail.interceptor';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ProfileDetailCandidateInterceptor } from './interceptor/profile-detail-candidate.interceptor';
// import { ThrottlerBehindProxyGuard } from 'src/throttlerBehindProxyGuard.guard';
// import { ThrottlerGuard } from '@nestjs/throttler';
// import { Throttle } from '@nestjs/throttler';
// import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';
// import { ImageValidator } from 'src/common/decorators/validation/image-validator/image.validator';
// import { ImagePipe } from 'src/common/helper/transform/image.transform';


@ApiTags('profiles')
@Controller('profiles')
// @UseGuards(ThrottlerBehindProxyGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Throttle({
  //   default: {
  //     limit: 3,
  //     ttl: 1000,
  //   },
  // })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileDetailInterceptor)
  @UseGuards(AuthGuard)
  @Get('me')
  async findOne(@Req() req: CustomRequest) {
    const id = req.user?.id;

    if (!id) {
      return null;
    }
    const profile = await this.profilesService.findOne(id);

    return profile;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileDetailCandidateInterceptor)
  async getProfileById(@Param('id') id: string, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }
      
      return await this.profilesService.getProfileById(id, accountId)
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile')
    }
  }

  @Put('job')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Something went wrong');
      }

      updateProfileDto.accountId = accountId;

      await this.profilesService.update(updateProfileDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Update profile successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  // @Put('avatar')
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // @UseInterceptors(FilesInterceptor('image', 1, {
  //   fileFilter: (_req, _file, cb) => {
  //       if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
  //           return cb(new Error('Only image files are allowed!'), false);
  //       }
  //       cb(null, true);
  //   }
  // }))
  // async updateAvatar(
  //   // @Req() req: CustomRequest,

  //   @UploadedFiles(
  //     new ParseFilePipeBuilder()
  //         .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
  //         .addValidator(new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }))
  //         .build({
  //             fileIsRequired: false,
  //             exceptionFactory: (errors) => {
  //                 return new Error(errors);
  //             }
  //         }),
  //     ImagePipe,
  // )
  // images: Express.Multer.File[],
  // ) {
  //   console.log('images', images);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Update profile successfully',
  //     data: images
  //   }
  // }
}
