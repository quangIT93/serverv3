import { PartialType } from '@nestjs/swagger';
import { CreateCadidateBookmarkDto } from './create-cadidate-bookmark.dto';

export class UpdateCadidateBookmarkDto extends PartialType(CreateCadidateBookmarkDto) {}
