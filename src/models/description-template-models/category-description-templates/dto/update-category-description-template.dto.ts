import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDescriptionTemplateDto } from './create-category-description-template.dto';

export class UpdateCategoryDescriptionTemplateDto extends PartialType(CreateCategoryDescriptionTemplateDto) {}
