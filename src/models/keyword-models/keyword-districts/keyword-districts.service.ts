import { Injectable } from '@nestjs/common';
import { CreateKeywordDistrictDto } from './dto/create-keyword-district.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordDistrict } from './entities/keyword-districts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KeywordDistrictsService {  

    constructor(
        @InjectRepository(KeywordDistrict)
        private readonly keywordDistrictRepository: Repository<KeywordDistrict>
    ){}


    async create(_createKeywordDistrictDto: CreateKeywordDistrictDto) {

        
        const newKeywordDistricts: KeywordDistrict[] = _createKeywordDistrictDto.districtId.map((_keywordId, index) => {
    
        const keywordDistrict = new KeywordDistrict();
        keywordDistrict.keywordId = _createKeywordDistrictDto.keywordId;
        keywordDistrict.districtId = _createKeywordDistrictDto.districtId[index];
    
        return keywordDistrict;
        });    
        await this.keywordDistrictRepository.save(newKeywordDistricts);
        
    }

    async findAll() {
        return this.keywordDistrictRepository.find();
    }


    async deteleAllByKeywordId(keywordId: number) {
        try {
            await this.keywordDistrictRepository.delete({keywordId})
        } catch (error) {
            throw new Error('Error')
        }
    }
}
