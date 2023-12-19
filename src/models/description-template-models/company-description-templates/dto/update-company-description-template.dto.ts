import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDescriptionTemplateDto } from './create-company-description-template.dto';

export class UpdateCompanyDescriptionTemplateDto extends PartialType(CreateCompanyDescriptionTemplateDto) {}
