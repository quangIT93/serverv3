import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent.entity';
import { Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import sharp from 'sharp';
import { AWSService } from 'src/services/aws/aws.service';
import { ChildrenService } from '../children/children.service';

@Injectable()
export class ParentService {


  constructor(
    @InjectRepository(ParentCategory)
    private readonly parentRepository: Repository<ParentCategory>,
    private readonly childrenService: ChildrenService,
    private readonly awsService: AWSService
  ){}

  findAll() {
    try {
      return this.parentRepository.find({relations: ['childCategories']})
    } catch (error) {
      throw new Error('Could not find')
    }
  }

  findOne(id: number) {
    try {
      return this.parentRepository.findOne({where: {id: id} , relations: ['childCategories']}) 
    } catch (error) {
      throw new Error('Could not find')
    }
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
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

      await this.parentRepository.update({id: idParent}, otherVariables)

      if (updateParentDto.childCategories?.[0]) {

        const {id, ...dataChild} = updateParentDto.childCategories?.[0]
        
        await this.childrenService.update(id, dataChild);

      }
    } catch (error) {
      throw new Error("Error while updating")
    }

  }
  
}
