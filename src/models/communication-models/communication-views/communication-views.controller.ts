import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunicationViewsService } from './communication-views.service';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { UpdateCommunicationViewDto } from './dto/update-communication-view.dto';

@Controller('communication-views')
export class CommunicationViewsController {
  constructor(private readonly communicationViewsService: CommunicationViewsService) {}

  @Post()
  create(@Body() createCommunicationViewDto: CreateCommunicationViewDto) {
    return this.communicationViewsService.create(createCommunicationViewDto);
  }

  @Get()
  findAll() {
    return this.communicationViewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationViewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationViewDto: UpdateCommunicationViewDto) {
    return this.communicationViewsService.update(+id, updateCommunicationViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationViewsService.remove(+id);
  }
}
