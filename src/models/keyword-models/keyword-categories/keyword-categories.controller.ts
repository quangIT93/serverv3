import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { KeywordCategoriesService } from './keyword-categories.service';
import { CreateKeywordCategoriesDto } from './dto/create-keyword-categories.dto';

@Controller('keyword-categories')
export class KeywordCategoriesController {
    constructor(
        private readonly keywordCategoriesService: KeywordCategoriesService
    ){}

    @Post()
    async create(@Body() createKeywordCategoriesDto : CreateKeywordCategoriesDto) {
        try {
            await this.keywordCategoriesService.create(createKeywordCategoriesDto)
            return {
                status: HttpStatus.OK,
                message: 'Created keyword category successfully'
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message)
            }
            throw new BadRequestException('Error creating keyword categories')
        }
    }
}
