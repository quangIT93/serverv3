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
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileDetailInterceptor } from './interceptor/profile-detail.interceptor';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ProfileDetailCandidateInterceptor } from './interceptor/profile-detail-candidate.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';


@ApiTags('profiles')
@Controller('profiles')
@UseGuards(ThrottlerGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

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
}
