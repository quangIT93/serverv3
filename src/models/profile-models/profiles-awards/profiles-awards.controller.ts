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
import { ProfilesAwardsService } from './profiles-awards.service';
import { CreateProfilesAwardDto } from './dto/create-profiles-award.dto';
import { UpdateProfilesAwardDto } from './dto/update-profiles-award.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('profiles-awards')
@ApiTags('Profiles Awards')
export class ProfilesAwardsController {
  constructor(private readonly profilesAwardsService: ProfilesAwardsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
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

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async findAll(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.profilesAwardsService.findAll(id),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile awards');
    }
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.profilesAwardsService.findOne(+id, accountId),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile award');
    }
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
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

  @Delete('remove-all')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async removeAll(@Body() data: any, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesAwardsService.removeMany(data.ids, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile award deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile award');
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesAwardsService.removeOne(+id, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile award deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile award');
    }
  }
}
