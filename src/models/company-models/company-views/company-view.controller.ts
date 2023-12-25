import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyViewsService } from './company-views.service';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { QueryCompanyViewDto } from './dto/query-company-view.dto';
import { CompanyViewCandidateInterceptor } from './interceptors/company-view-candidate.interceptor';

@ApiTags('Company-views')
@Controller('Company-views')
export class CompanyViewsController {
  constructor(private readonly companyViewsService: CompanyViewsService) {}

  @Get('by-company')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor, CompanyViewCandidateInterceptor)
  async findAllByCompany(
    @Req() req: CustomRequest,
    @Query() query: QueryCompanyViewDto,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new UnauthorizedException();
      }

      return this.companyViewsService.findAllByCompany(accountId, query);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }
}
