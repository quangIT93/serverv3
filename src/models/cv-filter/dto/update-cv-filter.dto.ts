import { PartialType } from '@nestjs/swagger';
import { CreateCvFilterDto } from './create-cv-filter.dto';

export class UpdateCvFilterDto extends PartialType(CreateCvFilterDto) {}
