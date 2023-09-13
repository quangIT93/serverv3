import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  BadRequestException,
  Req,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProfileLanguagesService } from './profile-languages.service';
import { CreateProfileLanguageDto } from './dto/create-profile-language.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileLanguageInterceptor } from './interceptor/profiles-language.interceptor';

@Controller('profile-languages')
@ApiTags('Profile Languages')
export class ProfileLanguagesController {
  constructor(
    private readonly profileLanguagesService: ProfileLanguagesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProfileLanguageDto: CreateProfileLanguageDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const id = req.user?.id;
      if (!id) {
        throw new BadRequestException('User not found');
      }

      createProfileLanguageDto.accountId = id;

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Add profile language successfully',
        data: await this.profileLanguagesService.create(
          createProfileLanguageDto,
        ),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile languages');
    }
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, ProfileLanguageInterceptor)
  findAll(@Req() req: CustomRequest) {
    const id = req.user?.id;
    if (!id) {
      throw new BadRequestException('User not found');
    }

    return this.profileLanguagesService.findAll(id);
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
  @ApiBearerAuth('JWT-auth')
  @Delete('remove')
  async removeAll(@Body() data: any, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      await this.profileLanguagesService.removeAll(data.ids, accountId);

      return {
        statusCode: HttpStatus.OK,
        message: 'Delete profile language successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete profile language');
    }
  }
}
