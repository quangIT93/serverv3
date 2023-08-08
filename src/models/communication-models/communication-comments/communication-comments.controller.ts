import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunicationCommentsService } from './communication-comments.service';
import { CreateCommunicationCommentDto } from './dto/create-communication-comment.dto';
import { UpdateCommunicationCommentDto } from './dto/update-communication-comment.dto';

@Controller('communication-comments')
export class CommunicationCommentsController {
  constructor(private readonly communicationCommentsService: CommunicationCommentsService) {}

  @Post()
  create(@Body() createCommunicationCommentDto: CreateCommunicationCommentDto) {
    return this.communicationCommentsService.create(createCommunicationCommentDto);
  }

  @Get()
  findAll() {
    return this.communicationCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communicationCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunicationCommentDto: UpdateCommunicationCommentDto) {
    return this.communicationCommentsService.update(+id, updateCommunicationCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communicationCommentsService.remove(+id);
  }
}
