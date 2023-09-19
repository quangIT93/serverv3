import { PartialType } from '@nestjs/swagger';
import { CreateProfilesCvDto } from './create-profiles_cv.dto';

export class UpdateProfilesCvDto extends PartialType(CreateProfilesCvDto) {

    id!:number;
}
