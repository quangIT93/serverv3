import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesActivitiesService } from './profiles-activities.service';
import { CreateProfilesActivityDto } from './dto/create-profiles-activity.dto';
import { UpdateProfilesActivityDto } from './dto/update-profiles-activity.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('profiles-activities')
@ApiTags('Profiles Activities')
export class ProfilesActivitiesController {
  constructor(
    private readonly profilesActivitiesService: ProfilesActivitiesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
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

  @Get()
  findAll() {
    return this.profilesActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfilesActivityDto: UpdateProfilesActivityDto,
  ) {
    return this.profilesActivitiesService.update(
      +id,
      updateProfilesActivityDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesActivitiesService.remove(+id);
  }
}
