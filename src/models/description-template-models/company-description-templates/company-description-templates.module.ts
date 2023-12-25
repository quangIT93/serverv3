import { Module } from '@nestjs/common';
import { CompanyDescriptionTemplatesService } from './company-description-templates.service';
import { CompanyDescriptionTemplatesController } from './company-description-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDescriptionTemplate } from './entities/company-description-template.entity';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyDescriptionTemplate, ParentCategory]),
    JwtAccessTokenModule,
  ],
  controllers: [CompanyDescriptionTemplatesController],
  providers: [CompanyDescriptionTemplatesService],
})
export class CompanyDescriptionTemplatesModule {}
