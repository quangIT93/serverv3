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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { DeleteProfilesSkillDto } from './dto/delete-profile-skill.dto';

@Controller('profiles-skills')
@ApiTags('Profiles Skills')
export class ProfilesSkillsController {
  constructor(private readonly profilesSkillsService: ProfilesSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  async removeAll(@Body() data: DeleteProfilesSkillDto, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      data.accountId = accountId;

      const result = await this.profilesSkillsService.removeAll(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile skill deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete skill language');
    }
  }
}
