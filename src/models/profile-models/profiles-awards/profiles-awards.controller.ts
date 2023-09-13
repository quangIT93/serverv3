import {
  Controller,
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
import { ProfilesAwardsService } from './profiles-awards.service';
import { CreateProfilesAwardDto } from './dto/create-profiles-award.dto';
import { UpdateProfilesAwardDto } from './dto/update-profiles-award.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteProfilesAwardDto } from './dto/delete-profile-award.dto';

@Controller('profiles-awards')
@ApiTags('Profiles Awards')
export class ProfilesAwardsController {
  constructor(private readonly profilesAwardsService: ProfilesAwardsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createProfilesAwardDto: CreateProfilesAwardDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesAwardDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesAwardsService.create(createProfilesAwardDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile award');
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProfilesAwardDto: UpdateProfilesAwardDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesAwardDto.accountId = accountId;

      await this.profilesAwardsService.update(+id, updateProfilesAwardDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile award updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile award not found');
    }
  }

  @Delete('remove')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeAll(@Body() data: DeleteProfilesAwardDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      data.accountId = accountId;

      const result = await this.profilesAwardsService.removeMany(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile awards deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile award');
    }
  }
}
