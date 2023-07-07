import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanySizesService } from './company-sizes.service';
import { CreateCompanySizeDto } from './dto/create-company-size.dto';
import { UpdateCompanySizeDto } from './dto/update-company-size.dto';

@Controller('company-sizes')
export class CompanySizesController {
  constructor(private readonly companySizesService: CompanySizesService) {}

  @Post()
  create(@Body() createCompanySizeDto: CreateCompanySizeDto) {
    return this.companySizesService.create(createCompanySizeDto);
  }

  @Get()
  findAll() {
    return this.companySizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companySizesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanySizeDto: UpdateCompanySizeDto) {
    return this.companySizesService.update(+id, updateCompanySizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companySizesService.remove(+id);
  }
}
