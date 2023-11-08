import { Controller } from '@nestjs/common';
// import { SalaryTypesService } from './salary-types.service';

@Controller('salary-types')
export class SalaryTypesController {
  constructor() {}

  // @Post()
  // create(@Body() createSalaryTypeDto: CreateSalaryTypeDto) {
  //   return this.salaryTypesService.create(createSalaryTypeDto);
  // }

  // @Get()
  // findAll() {
  //   return this.salaryTypesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.salaryTypesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSalaryTypeDto: UpdateSalaryTypeDto) {
  //   return this.salaryTypesService.update(+id, updateSalaryTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.salaryTypesService.remove(+id);
  // }
}
