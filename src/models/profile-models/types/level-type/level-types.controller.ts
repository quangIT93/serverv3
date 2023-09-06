import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { LevelTypeService } from './level-types.service';
import { CreateLevelTypeDto } from './dto/create-level-type.dto';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('level-types')
export class LevelTypeController {
  constructor(
    private readonly levelTypeService: LevelTypeService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  async create(@Body() createLevelTypeDto: CreateLevelTypeDto) {
    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.levelTypeService.create(
          createLevelTypeDto,
        ),
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error creating level type',
      };
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.levelTypeService.findAll(),
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error geting level types',
      };
    }
  }
}
