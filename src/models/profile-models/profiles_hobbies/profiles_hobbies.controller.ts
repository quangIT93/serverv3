import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesHobbiesService } from './profiles_hobbies.service';
import { CreateProfilesHobbyDto } from './dto/create-profiles_hobby.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('profiles-hobbies')
@ApiTags('Profiles Hobbies')
export class ProfilesHobbiesController {
  constructor(
    private readonly profilesHobbiesService: ProfilesHobbiesService,
  ) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  async create(
    @Body() createProfilesHobbyDto: CreateProfilesHobbyDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesHobbyDto.accountId = id;

      return await this.profilesHobbiesService.createOrUpate(
        createProfilesHobbyDto,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile hobby');
    }
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async findOne(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.profilesHobbiesService.findOne(accountId),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile hobby');
    }
  }

  @Delete()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async remove(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      await this.profilesHobbiesService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Profile hobby deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile hobby');
    }
  }
}
