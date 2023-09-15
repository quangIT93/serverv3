import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  HttpStatus,

} from '@nestjs/common';
import { ProfilesReferencesService } from './profiles-references.service';
import { CreateProfilesReferenceDto } from './dto/create-profiles-reference.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { DeleteProfilesReferenceDto } from './dto/delete-profile-reference.dto';
@Controller('profiles-references')
@ApiTags('Profiles References')
export class ProfilesReferencesController {
  constructor(
    private readonly profilesReferencesService: ProfilesReferencesService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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

      const data = await this.profilesReferencesService.create(
        createProfilesReferenceDto,
      )

      return {
        statusCode: HttpStatus.CREATED,
        data: data,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating profile references');
    }
  }

  @Delete('remove')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeAll(@Req() req: CustomRequest, @Body() data: DeleteProfilesReferenceDto) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      data.accountId = id;

      const result = await this.profilesReferencesService.removeAll(data);

      return {
        statusCode: HttpStatus.OK,
        message: `${result.affected} profile references deleted successfully`,
        data: result.affected,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error delete references language');
    }
  }
}
