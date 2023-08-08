import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunicationLikesService } from './communication-likes.service';
import { CreateCommunicationLikeDto } from './dto/create-communication-like.dto';
import { UpdateCommunicationLikeDto } from './dto/update-communication-like.dto';

@Controller('communication-likes')
export class CommunicationLikesController {
  constructor(private readonly communicationLikesService: CommunicationLikesService) {}

  @Post()
  create(@Body() createCommunicationLikeDto: CreateCommunicationLikeDto) {
    return this.communicationLikesService.create(createCommunicationLikeDto);
  }

  @Get()
  findAll() {
    return this.communicationLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationLikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationLikeDto: UpdateCommunicationLikeDto) {
    return this.communicationLikesService.update(+id, updateCommunicationLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationLikesService.remove(+id);
  }
}
