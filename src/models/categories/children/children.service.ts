import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCategory } from './entities/child.entity';
import { Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto';
// import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {


  constructor( 
    @InjectRepository(ChildCategory)
    private readonly childRepository: Repository<ChildCategory>){}

  findAll() {
    return `This action returns all children`;
  }

  async create(createChildDto: CreateChildDto) {
    try {
      await this.childRepository.save(createChildDto) 

      return true;
    } catch (error) {
      throw new Error('Error from server')
    }    
  }

  async findOne(id: number) {
    const children =  await this.childRepository.findOne({where: {id: id}});

    if (!children) {
      throw new Error('Child not found')
    }

    return children
  }

  async disable(id: number) { 
    try {
      const child_categories = await this.childRepository.findOne({ where: { id } });
  
      if (!child_categories || child_categories.status === 0) {
        throw new Error('No child categories or child status = 1');
      }
    
      const newChildCategories = {...child_categories, status: 0}
      const updatedChildCategory = await this.childRepository.save(newChildCategories);
     
      return updatedChildCategory;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async enable(id: number) {
    try {
      const child_categories = await this.childRepository.findOne({ where: { id } });
  
      if (!child_categories || child_categories.status === 1) {
        throw new Error('No child categories or child status = 0');
      }
    
      const newChildCategories = {...child_categories, status: 1}
      const updatedChildCategory = await this.childRepository.save(newChildCategories);
     
      return updatedChildCategory;
    } catch (error) {
      throw new Error('Error');
    }
  }

  // update(id: number, updateChildDto: UpdateChildDto) {
  //   return `This action updates a #${id} child`;
  // }

  remove(id: number) {
    return `This action removes a #${id} child`;
  }

  async getChildByIdParent(id: number) : Promise<ChildCategory[] | undefined> {
    const child = await this.childRepository.find({where: {parentCategoryId: id}})
    
    return child;
  }
}
