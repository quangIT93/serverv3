import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  HttpStatus,
  Req,
  Put,
} from '@nestjs/common';
import { ProfilesJobsService } from './profiles-jobs.service';
import { CreateProfilesJobDto } from './dto/create-profiles-job.dto';
import { UpdateProfilesJobDto } from './dto/update-profiles-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('profiles-jobs')
@ApiTags('Profiles Jobs')
export class ProfilesJobsController {
  constructor(private readonly profilesJobsService: ProfilesJobsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createProfilesJobDto: CreateProfilesJobDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account Id is required');
      }

      createProfilesJobDto.accountId = accountId;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesJobsService.createMany(createProfilesJobDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile jobs');
    }
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Body() updateProfilesJobDto: UpdateProfilesJobDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('Account Id is required');
      }

      updateProfilesJobDto.accountId = accountId;

      await this.profilesJobsService.update(updateProfilesJobDto)

      return {
        statusCode: HttpStatus.OK,
        message: 'Update profile jobs successfully',
      };

    } catch (error) {
      throw error;
    }
  }
}
