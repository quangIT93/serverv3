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

  @ApiBearerAuth()
  @Post()
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

  @ApiBearerAuth()
  @Get('account')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CompanyBookmarkedInterceptor)
  async findAllByAccount(@Req() req: CustomRequest) {
    try {
      const accountId = req.user?.id;
      const { limit, page } = req.query;

      if (!accountId) {
        throw new UnauthorizedException();
      }
      return await this.companyBookmarkedService.findAllByAccount(
        accountId,
        limit ? +limit : 20,
        page ? +page : 0,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('getting error');
    }
  }
}
