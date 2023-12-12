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
  UnauthorizedException,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileDetailInterceptor } from './interceptor/profile-detail.interceptor';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ProfileDetailCandidateInterceptor } from './interceptor/profile-detail-candidate.interceptor';
import { ThrottlerBehindProxyGuard } from 'src/throttlerBehindProxyGuard.guard';
// import { ThrottlerGuard } from '@nestjs/throttler';
import { Throttle } from '@nestjs/throttler';
// import { ProfileInformationSerialization } from './serialization/profile-information.serialization';
import { ProfileInformationInterceptor } from './interceptor/profile-information.interceptor';
import { ProfileMoreInformationInterceptor } from './interceptor/profile-more-information.interceptor';
import { CompanyInterceptor } from 'src/models/company-models/companies/interceptors/company.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarImagePipe } from './interceptor/avatar.interceptor';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_AVATAR_UPLOAD } from 'src/common/constants';
import { ProfileActivityLogInterceptor } from './interceptor/profile-activity.interceptor';

@ApiTags('profiles')
@Controller('profiles')
@UseGuards(ThrottlerBehindProxyGuard)
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly awsService: AWSService,
  ) {}

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileActivityLogInterceptor)
  @UseGuards(AuthGuard)
  @Get("activity-logs")
  async getActivityLogs(@Req() req: CustomRequest) {
    try {

      const id = req.user?.id;

      if (!id) {
        throw new UnauthorizedException();
      }

      return this.profilesService.findActivityByAccountId(id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileActivityLogInterceptor)
  @UseGuards(AuthGuard)
  @Get("activity-logs/recruiter")
  async getRecruiterActivityLogs(@Req() req: CustomRequest) {
    try {

      const id = req.user?.id;

      if (!id) {
        throw new UnauthorizedException();
      }

      return this.profilesService.findActivityByRecruiterId(id);
    } catch (error) {
      throw error;
    }
  }

  @Throttle({
    default: {
      limit: 3,
      ttl: 1000,
    },
  })
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
  @UseInterceptors(
    ClassSerializerInterceptor,
    ProfileDetailCandidateInterceptor,
  )
  async getProfileById(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account not found');
      }

      return await this.profilesService.getProfileById(id, accountId);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile');
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

  // @Throttle({
  //   default: {
  //     limit: 3,
  //     ttl: 1000,
  //   },
  // })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, ProfileInformationInterceptor)
  @UseGuards(AuthGuard)
  @Get('me/information')
  async information(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new UnauthorizedException();
      }
      const profile = await this.profilesService.getProfileInformation(id);

      return profile;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }

  @ApiBearerAuth()
  @UseInterceptors(
    ClassSerializerInterceptor,
    ProfileMoreInformationInterceptor,
  )
  @UseGuards(AuthGuard)
  @Get('me/information/more')
  async informationMore(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new UnauthorizedException();
      }
      const profile = await this.profilesService.getProfileMoreInformation(id);

      return profile;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor, CompanyInterceptor)
  @UseGuards(AuthGuard)
  @Get('me/company')
  async company(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new UnauthorizedException();
      }
      const profile = await this.profilesService.getProfileCompany(id);

      return profile;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }

  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Put('me/avatar')
  @UseInterceptors(
    FileInterceptor('images', { limits: { fieldSize: 1024 * 1024 * 6 } }),
  )
  async updateAvatar(
    @Req() req: CustomRequest,
    @UploadedFile(AvatarImagePipe) images: any,
  ) {
    try {
      Logger.log('Update avatar');

      const id = req.user?.id;

      if (!id) {
        throw new UnauthorizedException();
      }

      if (!images) {
        throw new BadRequestException('File not found');
      }

      const uploadedAvatar = await this.awsService.uploadFile(images, {
        BUCKET: BUCKET_IMAGE_AVATAR_UPLOAD,
        // id,
      });

      const profile = await this.profilesService.updateAvatar(
        id,
        images.originalname,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Update avatar successfully',
        data: {
          ...profile,
          avatar: uploadedAvatar.Location,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }
}
