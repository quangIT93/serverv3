import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Req,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProfilesCoursesService } from './profiles-courses.service';
import { CreateProfilesCourseDto } from './dto/create-profiles-course.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ProfileCoursesInterceptor } from './interceptor/profiles-courses.interceptor';

@Controller('profiles-courses')
@ApiTags('Profiles Courses')
export class ProfilesCoursesController {
  constructor(
    private readonly profilesCoursesService: ProfilesCoursesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProfilesCourseDto: CreateProfilesCourseDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesCourseDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesCoursesService.create(createProfilesCourseDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile course');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, ProfileCoursesInterceptor)
  async findAll(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      return await this.profilesCoursesService.findAll(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile course');
    }
  }

  @Delete('remove-all')
  @UseGuards(AuthGuard)
  async removeAll(@Body() data: any, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesCoursesService.removeAll(data.ids, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile course successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete profile course');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesCoursesService.remove(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile course successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile course');
    }
  }
}
