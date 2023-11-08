import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { CompanyRatingsService } from './company-ratings.service';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CompanyRatingsInterceptor } from './interceptors/company-ratings.interceptor';
import { AuthNotRequiredGuard } from 'src/authentication/authNotRequired.guard';
import { RoleGuard } from 'src/authentication/role.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';

@ApiTags('Company-ratings')
@Controller('company-ratings')
export class CompanyRatingsController {
  constructor(private readonly companyRatingsService: CompanyRatingsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCompanyRatingDto: CreateCompanyRatingDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (accountId) {
        createCompanyRatingDto.accountId = accountId;
      }

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.companyRatingsService.create(createCompanyRatingDto),
        message: 'Create company rated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating');
    }
  }

  @Get('/company/:id')
  @ApiBearerAuth()
  @UseGuards(AuthNotRequiredGuard)
  @UseInterceptors(ClassSerializerInterceptor, CompanyRatingsInterceptor)
  findAllByCompany(@Param('id') id: number, @Req() req: CustomRequest) {
    try {
      const { limit, page } = req.query;
      return this.companyRatingsService.findAllByCompany(
        +id,
        limit ? +limit : 20,
        page ? +page : 0,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.companyRatingsService.remove(+id);
  }
}
