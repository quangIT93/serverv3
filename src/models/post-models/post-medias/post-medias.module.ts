import { Module } from '@nestjs/common';
import { PostMediasService } from './post-medias.service';
import { PostMediasController } from './post-medias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMedia } from './entities/post-media.entity';
import { Company } from 'src/models/company-models/companies/entities/company.entity';
import { Post } from '../posts/entities';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostMedia, Company, Post]),
    JwtAccessTokenModule,
    AWSModule,
  ],
  controllers: [PostMediasController],
  providers: [PostMediasService],
})
export class PostMediasModule {}
