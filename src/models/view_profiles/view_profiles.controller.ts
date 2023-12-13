import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Req,
  HttpStatus,
  Get,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ViewProfilesService } from './view_profiles.service';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CompaniesInterceptor } from '../company-models/companies/interceptors/companies.interceptor';
import { ViewedCompanyDto } from './dto/viewed-company.dto';
import { ViewProfileInterceptor } from './interceptors/view-profile.interceptor';

@Controller('view-profiles')
@ApiTags('View Profiles')
export class ViewProfilesController {
  constructor(private readonly viewProfilesService: ViewProfilesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createViewProfileDto: CreateViewProfileDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      createViewProfileDto.recruitId = accountId;

      const total = await this.viewProfilesService.create(createViewProfileDto);

      return {
        status: HttpStatus.OK,
        total,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error');
    }
  }

  @Get('companies-viewed/by-account')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CompaniesInterceptor)
  async getCompanyViewedByAccount(
    @Req() req: CustomRequest,
    @Query() query: ViewedCompanyDto,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      return this.viewProfilesService.getCompanyViewedByAccount(
        accountId,
        query,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Get('by-account')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, ViewProfileInterceptor)
  async getProfileByRecruit(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      const { limit, page } = req.query;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      return this.viewProfilesService.getProfilesByRecruit(
        accountId,
        limit ? +limit : 20,
        page ? +page : 0,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }
}
