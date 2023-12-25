import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Query,
  HttpStatus,
  Res,
  UseGuards,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CompanyDescriptionTemplatesService } from './company-description-templates.service';
import { CreateCompanyDescriptionTemplateDto } from './dto/create-company-description-template.dto';
import { UpdateCompanyDescriptionTemplateDto } from './dto/update-company-description-template.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { RoleGuard } from 'src/authentication/role.guard';
import { AuthGuard } from 'src/authentication/auth.guard';
import { QueryCompanyDescriptionDto } from './dto/query-company-description.dto';
import { CompanyDescriptionTemplateInterceptor } from './interceptors/company-description-template.interceptor';
import { DetailCompanyDescriptionInterceptor } from './interceptors/detail-company-description.interceptor';

@ApiTags('Company-description-templates')
@Controller('company-description-templates')
export class CompanyDescriptionTemplatesController {
  constructor(
    private readonly companyDescriptionTemplatesService: CompanyDescriptionTemplatesService,
  ) {}

  @Post('by-admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async create(
    @Res() res: Response,
    @Body()
    createCompanyDescriptionTemplateDto: CreateCompanyDescriptionTemplateDto,
  ) {
    try {
      const data = await this.companyDescriptionTemplatesService.create(
        createCompanyDescriptionTemplateDto,
      );

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Template created successfully',
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Posting error');
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    CompanyDescriptionTemplateInterceptor,
  )
  async findAll(@Query() query: QueryCompanyDescriptionDto) {
    try {
      return await this.companyDescriptionTemplatesService.findAll(query);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Get('by-admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async findAllByAdmin() {
    try {
      return await this.companyDescriptionTemplatesService.findAllByAdmin();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    DetailCompanyDescriptionInterceptor,
  )
  async indOne(@Param('id') id: string) {
    try {
      return await this.companyDescriptionTemplatesService.findOne(+id);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Put(':id/by-admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @Body()
    updateCompanyDescriptionTemplateDto: UpdateCompanyDescriptionTemplateDto,
  ) {
    try {
      await this.companyDescriptionTemplatesService.update(
        +id,
        updateCompanyDescriptionTemplateDto,
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Template updated successfully',
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Patching error');
    }
  }

  @Delete(':id/by-admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.companyDescriptionTemplatesService.remove(+id);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Template deleted successfully',
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Deleting error');
    }
  }
}
