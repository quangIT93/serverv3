import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationCategory } from './entities/communication.entity';
import { EntityManager } from 'typeorm';
import { CreateCommunicationCategoriesDto } from './dto/create-communication-categories.dto';

@Injectable()
export class CommunicationCategoriesService {
    constructor(
        @InjectRepository(CommunicationCategory)
        private readonly globalEntityManager: EntityManager
    ){}

    async create(createCommunicationCategoriesDto: CreateCommunicationCategoriesDto, transactionalManager?: EntityManager) {
        const manager = transactionalManager ?? this.globalEntityManager;

        return await manager.getRepository(CommunicationCategory).save(createCommunicationCategoriesDto);

    }
}
