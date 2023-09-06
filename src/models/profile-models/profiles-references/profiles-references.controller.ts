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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProfilesReferencesService } from './profiles-references.service';
import { CreateProfilesReferenceDto } from './dto/create-profiles-reference.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ProfileReferenceInterceptor } from './interceptor/profiles-reference.interceptor';

@Controller('profiles-references')
@ApiTags('Profiles References')
export class ProfilesReferencesController {
  constructor(
    private readonly profilesReferencesService: ProfilesReferencesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProfilesReferenceDto: CreateProfilesReferenceDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfilesReferenceDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesReferencesService.create(
          createProfilesReferenceDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile references');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, ProfileReferenceInterceptor)
  async findAll(@Req() req: CustomRequest) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      return await this.profilesReferencesService.findAll(id)
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting profile references');
    }
  }

  @Delete('remove-all')
  @UseGuards(AuthGuard)
  async removeAll(@Req() req: CustomRequest, @Body() data : any) {
    try {
      const id = req.user?.id;

      if(!id) {
        throw new BadRequestException('User not found');
      }

      await this.profilesReferencesService.removeAll(data.ids, id);


      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile references successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete references language');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profilesReferencesService.remove(+id);

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile reference deleted successfully',
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error deleting profile references');
    }
  }
}
