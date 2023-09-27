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
// import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { plainToInstance } from 'class-transformer';
import { ProfileDetailInterceptor } from './interceptor/profile-detail.interceptor';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ProfileDetailCandidateInterceptor } from './interceptor/profile-detail-candidate.interceptor';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profilesService.create(createProfileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profilesService.findAll();
  // }

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
  @UseInterceptors(ClassSerializerInterceptor, ProfileDetailCandidateInterceptor)
  async getProfileById(@Param('id') id: string) {
    try {
      return await this.profilesService.getProfileById(id)
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
