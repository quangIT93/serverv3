import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommunicationDto } from './create-communication.dto';

export class UpdateCommunicationDto extends PartialType(CreateCommunicationDto) {

    @ApiProperty({type: 'number',format: 'number', required: true})
    id!: number;
}
