import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
  HttpStatus,
  Res,
  UseGuards,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CategoryDescriptionTemplatesService } from './category-description-templates.service';
import { UpdateCategoryDescriptionTemplateDto } from './dto/update-category-description-template.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCategoryDescriptionTemplateDto } from './dto/create-category-description-template.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Role } from 'src/common/enum';
import { Roles } from 'src/authentication/roles.decorator';
import { RoleGuard } from 'src/authentication/role.guard';
import { CategoryDescriptionTemplateInterceptor } from './interceptors/category-description-templates.interceptor';
import { QueryCategoryDescriptionDto } from './dto/query-category-description.dto';
import { DetailCategoryDescriptionInterceptor } from './interceptors/detail-category-template.interceptor';

@ApiTags('Category-description-templates')
@Controller('category-description-templates')
export class CategoryDescriptionTemplatesController {
  constructor(
    private readonly categoryDescriptionTemplatesService: CategoryDescriptionTemplatesService,
  ) {}

  @Post('by-admin')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async create(
    @Body()
    createCategoryDescriptionTemplateDto: CreateCategoryDescriptionTemplateDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.categoryDescriptionTemplatesService.create(
        createCategoryDescriptionTemplateDto,
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

  @Get('by-admin')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async findAllByAdmin() {
    try {
      return await this.categoryDescriptionTemplatesService.findAllByAdmin();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    CategoryDescriptionTemplateInterceptor,
  )
  async findAll(@Query() query: QueryCategoryDescriptionDto) {
    try {
      return await this.categoryDescriptionTemplatesService.findAll(query);
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
    DetailCategoryDescriptionInterceptor,
  )
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryDescriptionTemplatesService.findOne(+id);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Getting error');
    }
  }

  @Put(':id/by-admin')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @Body()
    updateCategoryDescriptionTemplateDto: UpdateCategoryDescriptionTemplateDto,
  ) {
    try {
      await this.categoryDescriptionTemplatesService.update(
        +id,
        updateCategoryDescriptionTemplateDto,
      );

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Template updated successfully',
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Putting error');
    }
  }

  @Delete(':id/by-admin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.categoryDescriptionTemplatesService.remove(+id);

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
