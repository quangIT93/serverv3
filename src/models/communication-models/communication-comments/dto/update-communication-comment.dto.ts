import { PartialType } from '@nestjs/swagger';
import { CreateCommunicationCommentDto } from './create-communication-comment.dto';

export class UpdateCommunicationCommentDto extends PartialType(CreateCommunicationCommentDto) {
    commentId!:number;
}
