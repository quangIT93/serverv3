import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { KeywordDistrictsService } from './keyword-districts.service';
import { CreateKeywordDistrictDto } from './dto/create-keyword-district.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('keyword-districts')
@Controller('keyword-districs')
export class KeywordDistricsController {
    constructor(
        private readonly keywordDistricsService: KeywordDistrictsService
    ){}

    @Post()
    async create(@Body() createKeywordDistrictDto : CreateKeywordDistrictDto) {
        console.log(createKeywordDistrictDto);
        try {
            await this.keywordDistricsService.create(createKeywordDistrictDto)

            return {
                status: HttpStatus.OK,
                message: 'Create keyword district successfully'
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message)
            }
            throw new BadRequestException('Error creating keyword district')
        }
    }
}
