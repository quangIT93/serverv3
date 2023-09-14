import {
  Controller,
  Body,
  UseGuards,
  BadRequestException,
  HttpStatus,
  Req,
  Put,
} from '@nestjs/common';
import { ProfilesJobsService } from './profiles-jobs.service';
import { UpdateProfilesJobDto } from './dto/update-profiles-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('profiles-jobs')
@ApiTags('Profiles Jobs')
export class ProfilesJobsController {
  constructor(private readonly profilesJobsService: ProfilesJobsService) {}

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
