import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from './entities/search.entity';
import { Repository } from 'typeorm';
import { CreateSearchSuggestDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.sto';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Search)
        private readonly searchRepository: Repository<Search>,
    ) { }
    
    async search() {
        return this.searchRepository
        .createQueryBuilder('suggest_search')
        .select([
            'suggest_search.id', 
            'suggest_search.keyword', 
            'suggest_search.status',
            'suggest_search.order',
            'suggest_search.createdAt', 
            'suggest_search.updatedAt'
        ])
        .orderBy('suggest_search.order', 'ASC')
        .getMany();
    }

    async create(createSearch : CreateSearchSuggestDto) {
        try {
            const search = await this.searchRepository.create(createSearch);
            return await this.searchRepository.save(search);
        } catch (error) {
            throw new Error('Error creating search')
        }
    }

    async update(id : number, update: UpdateSearchDto) {
        const search = await this.searchRepository.findOne({where: {id: id }});

        if (!search) {
            throw new NotFoundException('Search suggest not found');
        }

        const newUpdate = this.searchRepository.create(update)

        return this.searchRepository.update(id, newUpdate)
    }

    async searchById(idNumber: number) {

        const search = await this.searchRepository.findOne({where: {id: idNumber}})

        if (!search) {
            throw new NotFoundException('Search suggest not found');
        }

        return search;
    }
}
