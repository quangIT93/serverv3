import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordCategory } from './entities/keyword-categories.entity';
import { Repository } from 'typeorm';
import { CreateKeywordCategoriesDto } from './dto/create-keyword-categories.dto';
// import { ParentService } from 'src/models/categories/parents/parents.service';

@Injectable()
export class KeywordCategoriesService {
    
    constructor(
        @InjectRepository(KeywordCategory)
        private readonly keywordCategoryRepository: Repository<KeywordCategory>,
        // private readonly parentService : ParentService
    ){}

    async create(_createKeywordCategoriesDto: CreateKeywordCategoriesDto) {
           
        const newKeywordCategories: KeywordCategory[] = _createKeywordCategoriesDto.categoryId.map((_category, index) => {
    
        const keywordCategory = new KeywordCategory();
        keywordCategory.keywordId = +_createKeywordCategoriesDto.keywordId;
        keywordCategory.categoryId = (_createKeywordCategoriesDto.categoryId as number[])[index];

        return keywordCategory;
        });    
        await this.keywordCategoryRepository.save(newKeywordCategories);
        
    }

    async findAll() {
        await this.keywordCategoryRepository.find()
    }

    async deteleAllByKeywordId(keywordId: number) {
        try {
            await this.keywordCategoryRepository.delete({keywordId})
        } catch (error) {
            throw new Error('Error')
        }
    }

}
