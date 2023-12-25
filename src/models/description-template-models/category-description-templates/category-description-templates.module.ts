import { Module } from '@nestjs/common';
import { CategoryDescriptionTemplatesService } from './category-description-templates.service';
import { CategoryDescriptionTemplatesController } from './category-description-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDescriptionTemplate } from './entities/category-description-template.entity';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryDescriptionTemplate, ChildCategory]),
    JwtAccessTokenModule,
  ],
  controllers: [CategoryDescriptionTemplatesController],
  providers: [CategoryDescriptionTemplatesService],
})
export class CategoryDescriptionTemplatesModule {}
