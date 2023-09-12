import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { ProfilesIntershipsService } from './profiles-interships.service';
import { CreateProfilesIntershipDto } from './dto/create-profiles-intership.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateProfilesIntershipDto } from './dto/update-profiles-intership.dto';

@Controller('profiles-interships')
@ApiTags('Profiles Interships')
export class ProfilesIntershipsController {
  constructor(
    private readonly profilesIntershipsService: ProfilesIntershipsService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async create(
    @Body() createProfilesIntershipDto: CreateProfilesIntershipDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesIntershipDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesIntershipsService.create(
          createProfilesIntershipDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile intership');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  async findAll(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new Error('User not found');
      }

      return {
        statusCode: HttpStatus.OK,
        data: await this.profilesIntershipsService.findAll(id),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile interships');
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
        data: await this.profilesIntershipsService.findOne(+id, accountId),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile intership not found');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateProfilesIntershipDto: UpdateProfilesIntershipDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesIntershipDto.accountId = accountId;

      await this.profilesIntershipsService.update(
        +id,
        updateProfilesIntershipDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile intership updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Profile intership not found');
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  async removeAll(@Body() data: any, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesIntershipsService.removeAll(data.ids, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile intership successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile intership');
    }
  }
}
