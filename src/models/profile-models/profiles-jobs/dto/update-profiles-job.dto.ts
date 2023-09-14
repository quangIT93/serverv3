import { PartialType } from '@nestjs/swagger';
import { CreateProfilesJobDto } from './create-profiles-job.dto';

export class UpdateProfilesJobDto extends PartialType(CreateProfilesJobDto) {

}
