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
} from '@nestjs/common';
import { CompanyDescriptionTemplatesService } from './company-description-templates.service';
import { CreateCompanyDescriptionTemplateDto } from './dto/create-company-description-template.dto';
import { UpdateCompanyDescriptionTemplateDto } from './dto/update-company-description-template.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PagingDto } from 'src/common/dtos/paging.dto';
import { Response } from 'express';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { RoleGuard } from 'src/authentication/role.guard';
import { AuthGuard } from 'src/authentication/auth.guard';

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
  findAll(@Query() query: PagingDto) {
    try {
      return this.companyDescriptionTemplatesService.findAll(query);
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
  findAllByAdmin() {
    try {
      return this.companyDescriptionTemplatesService.findAllByAdmin();
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
  findOne(@Param('id') id: string) {
    try {
      return this.companyDescriptionTemplatesService.findOne(+id);
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
