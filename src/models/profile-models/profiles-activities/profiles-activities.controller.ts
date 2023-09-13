import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProfilesActivitiesService } from './profiles-activities.service';
import { CreateProfilesActivityDto } from './dto/create-profiles-activity.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { UpdateProfilesActivityDto } from './dto/update-profiles-activity.dto';

@Controller('profiles-activities')
@ApiTags('Profiles Activities')
export class ProfilesActivitiesController {
  constructor(
    private readonly profilesActivitiesService: ProfilesActivitiesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProfilesActivityDto: CreateProfilesActivityDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesActivityDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesActivitiesService.create(
          createProfilesActivityDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile activity');
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  async findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.profilesActivitiesService.findOne(+id, accountId),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile activity not found');
    }
  }


  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  @Delete('remove')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async removeAll(@Req() req: CustomRequest, @Body() data: any) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesActivitiesService.removeAll(data.ids, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile activity deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile activity');
    }
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProfilesActivityDto: UpdateProfilesActivityDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesActivityDto.accountId = accountId;

      await this.profilesActivitiesService.update(
        +id,
        updateProfilesActivityDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile activity updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile activity not found');
    }
  }
}
