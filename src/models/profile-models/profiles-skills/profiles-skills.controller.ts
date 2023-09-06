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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProfilesSkillsService } from './profiles-skills.service';
import { CreateProfilesSkillDto } from './dto/create-profiles-skill.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ProfileSkillInterceptor } from './interceptor/profiles-skills.interceptor';

@Controller('profiles-skills')
@ApiTags('Profiles Skills')
export class ProfilesSkillsController {
  constructor(private readonly profilesSkillsService: ProfilesSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProfilesSkillDto: CreateProfilesSkillDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id ? req.user?.id : '';
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

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, ProfileSkillInterceptor)
  findAll(@Req() req: CustomRequest) {
    const id = req.user?.id ? req.user?.id : '';
    if (!id) {
      throw new BadRequestException('User not found');
    }

    return this.profilesSkillsService.findAll(id);
  }


  @UseGuards(AuthGuard)
  @Delete('remove-all')
  async removeAll(@Body() data : any, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id ? req.user?.id : '';
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id ? req.user?.id : '';
      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesSkillsService.remove(+id, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile skill successfully',
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete profile skill');
    }
  }
}
