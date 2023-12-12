import { PartialType } from '@nestjs/swagger';
import { CreateCompanyViewDto } from './create-company-view.dto';

export class UpdatePostViewDto extends PartialType(CreateCompanyViewDto) {}
