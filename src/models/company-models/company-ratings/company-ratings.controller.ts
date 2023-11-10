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
  UnauthorizedException,
  Put,
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
import { CompanyRatingInterceptor } from './interceptors/company-rating.interceptor';
import { UpdateCompanyRatingByUserDto } from './dto/update-company-rating-by-user.dto';

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
  async findAllByCompany(@Param('id') id: number, @Req() req: CustomRequest) {
    try {
      const { limit, page } = req.query;
      return await this.companyRatingsService.findAllByCompany(
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

  @Get('/account/company/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CompanyRatingInterceptor)
  async findOneByCompany(
    @Param('id') companyId: number,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      return await this.companyRatingsService.findOneByUser(
        accountId,
        companyId,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Put('/account/company/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateCompanyRatingDto: UpdateCompanyRatingByUserDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      updateCompanyRatingDto.accountId = accountId;
      updateCompanyRatingDto.companyId = id;

      await this.companyRatingsService.updateByUser(updateCompanyRatingDto);

      return {
        status: HttpStatus.OK,
        message: 'Evaluate updated successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Putting error');
    }
  }

  @Delete('account/company/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeByUser(@Param('id') id: number, @Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      await this.companyRatingsService.removeByUser(accountId, id);

      return {
        status: HttpStatus.OK,
        message: 'Evaluate deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Deleting error');
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    try {
      await this.companyRatingsService.remove(+id);

      return {
        status: HttpStatus.OK,
        message: 'Evaluate deleted successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Deleting error');
    }
  }
}
