import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ProfilesSkillsService } from './profiles-skills.service';
import { CreateProfilesSkillDto } from './dto/create-profiles-skill.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('profiles-skills')
@ApiTags('Profiles Skills')
export class ProfilesSkillsController {
  constructor(private readonly profilesSkillsService: ProfilesSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProfilesSkillDto: CreateProfilesSkillDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;
      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesSkillDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Add profile skill successfully',
        data: await this.profilesSkillsService.create(createProfilesSkillDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile skill');
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
  @UseGuards(AuthGuard)
  @Delete('remove')
  @ApiBearerAuth()
  async removeAll(@Body() data: any, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesSkillsService.removeAll(data.ids, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile skill successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete skill language');
    }
  }
}
