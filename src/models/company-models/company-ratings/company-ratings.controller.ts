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
} from '@nestjs/common';
import { CompanyRatingsService } from './company-ratings.service';
import { CreateCompanyRatingDto } from './dto/create-company-rating.dto';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CompanyRatingsInterceptor } from './interceptors/company-ratings.interceptor';

@ApiTags('Company-ratings')
@Controller('company-ratings')
export class CompanyRatingsController {
  constructor(private readonly companyRatingsService: CompanyRatingsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createCompanyRatingDto: CreateCompanyRatingDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (accountId) {
        createCompanyRatingDto.accountId = accountId;
      }

      return this.companyRatingsService.create(createCompanyRatingDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }

  @Get('/company/:id')
  @UseInterceptors(ClassSerializerInterceptor, CompanyRatingsInterceptor)
  findAllByCompany(@Param('id') id: number) {
    try {
      return this.companyRatingsService.findAllByCompany(+id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error getting');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyRatingsService.remove(+id);
  }
}
