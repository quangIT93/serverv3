import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent.entity';
import { Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ChildCategory } from '../children/entities/child.entity';
import { UpdateChildDto } from '../children/dto/update-child.dto';
import sharp from 'sharp';
import { AWSService } from 'src/services/aws/aws.service';


@Injectable()
export class ParentService {

  // create(createParentDto: CreateParentDto) {
  //   return 'This action adds a new parent';
  // }
  constructor(
    @InjectRepository(ParentCategory)
    private readonly parentRepository: Repository<ParentCategory>,
    @InjectRepository(ChildCategory)
    private readonly childRepository: Repository<ChildCategory>,
    private readonly awsService: AWSService
  ){}

  findAll() {
    return this.parentRepository.find({relations: ['childCategories']})
  }

  findOne(id: number) {
    const parentCategory = this.parentRepository.findOne({where: {id: id} , relations: ['childCategories']}) 

    if(!parentCategory) {
      throw new NotFoundException('Parent not found')
    }

    return parentCategory
  }

  // update(id: number, updateParentDto: UpdateParentDto) {
  //   return `This action updates a #${id} parent`;
  // }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }

  async disable(id: number) {
    try {
      const parent_categories = await this.parentRepository.findOne({ where: { id } });
  
      if (!parent_categories || parent_categories.status === 0) {
        throw new Error('No parent categories or parent status = 1');
      }
    
      const newParentCategories = {...parent_categories, status: 0}
      const updatedParentCategory = await this.parentRepository.save(newParentCategories);
     
      return updatedParentCategory;
    } catch (error) {
      throw new Error('Error');
    }
  }

  async enable(id: number) {
    try {
      const parent_categories = await this.parentRepository.findOne({ where: { id } });

      if (!parent_categories || parent_categories.status === 1) {
        throw new Error('No parent categories or parent status = 0');
      }

      const newParentCategories = {...parent_categories, status: 1}
      const updatedParentCategory = await this.parentRepository.save(newParentCategories)

      return updatedParentCategory;
    } catch (error) {
      throw new Error('Error')
    }
  }

  async createParent(dto: CreateParentDto, files: { image: Express.Multer.File[], defaultPostImage: Express.Multer.File[] }) {
    try {
      const parent = new ParentCategory();
      parent.status = dto.status;
      parent.name = dto.name;
      parent.nameEn = dto.nameEn;
      parent.nameKor = dto.nameKor;

      // save with s3
      if (files.image && files.image.length > 0) {
        const imageBuffer = files.image[0].buffer; 
        const resizedImageBuffer = await sharp(imageBuffer).resize(106, 105).toBuffer();
        const imageUrl = await this.awsService.uploadImageToS3(resizedImageBuffer, files.image[0].originalname);
        parent.image = imageUrl;
      }

      if (files.defaultPostImage && files.defaultPostImage.length > 0) {
        const defaultPostImageBuffer = files.defaultPostImage[0].buffer; 
        const defaultPostImageUrl = await this.awsService.uploadImageDefaultToS3(defaultPostImageBuffer, files.defaultPostImage[0].originalname);
        parent.defaultPostImage = defaultPostImageUrl;
      }

      // Save database
      await this.parentRepository.save(parent);

      return true;
    } catch (error) {
      throw new Error('Error while creating parent');
    }
  }
  

  async update(idParent: number, updateParentDto: UpdateParentDto) {

    try {
      const { childCategories, ...otherVariables } = updateParentDto;

      const parent_categories = await this.parentRepository.findOne({ where: { id: idParent }})

      await this.parentRepository.update({id: idParent}, otherVariables)

    if (!parent_categories ) {
      throw new Error('No parent categories')
    }

    // const updatedParentCategory = await this.parentRepository.update(id, updateParentDto)

    childCategories?.map(async (parentCategory : UpdateChildDto) => {

      const childCategories = await this.childRepository.findOne({ where: {
        id: parentCategory.id,
        parentCategoryId: parentCategory.parentCategoryId
      }})
      
      if (!childCategories) {
        throw new Error('No child categories')
      }

      await this.childRepository.update({id : parentCategory.id}, parentCategory)
    })

    return true
    } catch (error) {
      throw new Error("Error while updating")
    }

  }
  
}
