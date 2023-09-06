import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { LanguageTypesService } from './language-types.service';
import { CreateLanguageTypeDto } from './dto/create-language-type.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('language-types')
export class LanguageTypesController {
  constructor(private readonly languageTypesService: LanguageTypesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  async create(@Body() createLanguageTypeDto: CreateLanguageTypeDto) {
    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.languageTypesService.create(createLanguageTypeDto),
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error creating language type',
      }
    }
  }

  @Get()
  async findAll() {
    try {
      return{
        statusCode: HttpStatus.OK,
        data: await this.languageTypesService.findAll(),
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error geting language types',
      }
    }
  }
}
