import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostMediaDto } from './dto/create-post-media.dto';
import { PostMedia } from './entities/post-media.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { Post } from '../posts/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from 'src/common/dtos/paging.dto';
import { UpdatePostMediaDto } from './dto/update-post-media.dto';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_POST_UPLOAD } from 'src/common/constants';

@Injectable()
export class PostMediasService {
  constructor(
    @InjectRepository(PostMedia)
    private postMediasRepository: Repository<PostMedia>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly awsService: AWSService,
  ) {}
  async create({
    accountId,
    body,
    image,
  }: {
    accountId: string;
    body: CreatePostMediaDto;
    image?: Express.Multer.File;
  }) {
    const company = await this.companyRepository.findOne({
      where: { accountId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    } else {
      body.companyId = company.id;
    }

    const post = await this.postRepository.findOne({
      where: { id: body.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (image) {
      await this.awsService.uploadFile(image, {
        BUCKET: BUCKET_IMAGE_POST_UPLOAD,
        id: body.postId,
      });
      body.image = image.originalname;
      body.status = 1;
    }

    const postMedia = this.postMediasRepository.create(body);
    return this.postMediasRepository.save(postMedia);
  }

  async findAll(query: PagingDto) {
    try {
      const { page, limit } = query;
      const postMedia = this.postMediasRepository
        .createQueryBuilder('postMedia')
        .leftJoinAndSelect('postMedia.post', 'post')
        .leftJoinAndSelect('postMedia.company', 'company')
        .where('postMedia.status = :status', { status: 1 })
        .andWhere('post.status = 1')
        .select([
          'postMedia',
          'post.id',
          'post.title',
          'company.id',
          'company.name',
          'company.logo',
        ]);

      const total = await postMedia.getCount();

      const data = await postMedia
        .take(page)
        .skip(page * limit)
        .orderBy('postMedia.createdAt', 'DESC')
        .getMany();

      return {
        total,
        data,
        is_over:
          data.length === total ? true : data.length < limit ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllByAdmin() {
    try {
      const postMedia = this.postMediasRepository
        .createQueryBuilder('postMedia')
        .leftJoinAndSelect('postMedia.post', 'post')
        .leftJoinAndSelect('postMedia.company', 'company')
        .select([
          'postMedia',
          'post.id',
          'post.title',
          'company.id',
          'company.name',
          'company.logo',
          'post.status',
        ]);

      const data = await postMedia
        .orderBy('postMedia.createdAt', 'DESC')
        .getMany();
      return {
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const postMedia = this.postMediasRepository
        .createQueryBuilder('postMedia')
        .leftJoinAndSelect('postMedia.post', 'post')
        .leftJoinAndSelect('postMedia.company', 'company')
        .where('postMedia.id = :id', { id })
        .select([
          'postMedia',
          'post.id',
          'post.title',
          'company.id',
          'company.name',
          'company.logo',
        ]);

      const data = await postMedia.getOne();

      if (!data) {
        throw new NotFoundException('Post media not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOneByPost(postId: number) {
    try {
      const postMedia = this.postMediasRepository
        .createQueryBuilder('postMedia')
        .leftJoinAndSelect('postMedia.post', 'post')
        .leftJoinAndSelect('postMedia.company', 'company')
        .where('postMedia.postId = :postId', { postId })
        .select([
          'postMedia',
          'post.id',
          'post.title',
          'company.id',
          'company.name',
          'company.logo',
        ]);

      const data = await postMedia.getOne();

      if (!data) {
        throw new NotFoundException('Post media not found');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async update({
    id,
    body,
    image,
  }: {
    id: number;
    body: UpdatePostMediaDto;
    image: Express.Multer.File;
  }) {
    try {
      const postMedia = await this.postMediasRepository.findOne({
        where: { id },
      });

      if (!postMedia) {
        throw new NotFoundException('Post media not found');
      }

      const post = await this.postRepository.findOne({
        where: { id: body.postId },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (image) {
        await this.awsService.uploadFile(image, {
          BUCKET: BUCKET_IMAGE_POST_UPLOAD,
          id: body.postId,
        });
        body.image = image.originalname;
        body.status = 1;
      }

      body.companyId = postMedia.companyId;

      await this.postMediasRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const postMedia = await this.postMediasRepository.findOne({
        where: { id },
      });

      if (!postMedia) {
        throw new NotFoundException('Post not found');
      }

      return await this.postMediasRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
