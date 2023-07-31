import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyImagesService } from './company-images.service';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { UpdateCompanyImageDto } from './dto/update-company-image.dto';

@Controller('company-images')
export class CompanyImagesController {
  constructor(private readonly companyImagesService: CompanyImagesService) {}

  @Post()
  create(@Body() createCompanyImageDto: CreateCompanyImageDto) {
    return this.companyImagesService.create(createCompanyImageDto);
  }

  @Get()
  findAll() {
    return this.companyImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyImageDto: UpdateCompanyImageDto) {
    return this.companyImagesService.update(+id, updateCompanyImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyImagesService.remove(+id);
  }
}
