import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Req,
  UnauthorizedException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CompanyBookmarkedService } from './company-bookmarked.service';
import { CreateCompanyBookmarkedDto } from './dto/create-company-bookmarked.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { CompanyBookmarkedInterceptor } from './interceptors/company-bookmarked.interceptor';

@Controller('company-bookmarked')
@ApiTags('Company-bookmarked')
export class CompanyBookmarkedController {
  constructor(
    private readonly companyBookmarkedService: CompanyBookmarkedService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCompanyBookmarkedDto: CreateCompanyBookmarkedDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      createCompanyBookmarkedDto.accountId = accountId;

      const data = await this.companyBookmarkedService.create(
        createCompanyBookmarkedDto,
      );

      if (data) {
        return {
          status: HttpStatus.CREATED,
          data,
        };
      }

      return {
        status: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('getting error');
    }
  }

  @Get('account')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CompanyBookmarkedInterceptor)
  async findAllByAccount(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      const { limit, page, sort } = req.query;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      if (sort && sort !== 'DESC' && sort !== 'ASC') {
        throw new BadRequestException('Param sort is DESC or ASC');
      }

      return await this.companyBookmarkedService.findAllByAccount(
        accountId,
        limit ? +limit : 20,
        page ? +page : 0,
        (sort as 'DESC' | 'ASC') ? (sort as 'DESC' | 'ASC') : 'DESC',
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('getting error');
    }
  }
}
