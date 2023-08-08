import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunicationCommentImagesService } from './communication-comment-images.service';
import { CreateCommunicationCommentImageDto } from './dto/create-communication-comment-image.dto';
import { UpdateCommunicationCommentImageDto } from './dto/update-communication-comment-image.dto';

@Controller('communication-comment-images')
export class CommunicationCommentImagesController {
  constructor(private readonly communicationCommentImagesService: CommunicationCommentImagesService) {}

  @Post()
  create(@Body() createCommunicationCommentImageDto: CreateCommunicationCommentImageDto) {
    return this.communicationCommentImagesService.create(createCommunicationCommentImageDto);
  }

  @Get()
  findAll() {
    return this.communicationCommentImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationCommentImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationCommentImageDto: UpdateCommunicationCommentImageDto) {
    return this.communicationCommentImagesService.update(+id, updateCommunicationCommentImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationCommentImagesService.remove(+id);
  }
}
