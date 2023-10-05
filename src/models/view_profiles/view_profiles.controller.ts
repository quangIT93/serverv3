import { Controller, Post, Body, BadRequestException, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { ViewProfilesService } from './view_profiles.service';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Controller('view-profiles')
@ApiTags('View Profiles')
export class ViewProfilesController {
  constructor(private readonly viewProfilesService: ViewProfilesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createViewProfileDto: CreateViewProfileDto, @Req() req: CustomRequest) {
    try {

      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      createViewProfileDto.recruitId = accountId;

      const total = await this.viewProfilesService.create(createViewProfileDto);

      return {
        status: HttpStatus.OK,
        total
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error');
    }
  }
}
