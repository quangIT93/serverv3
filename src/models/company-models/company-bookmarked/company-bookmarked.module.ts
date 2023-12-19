import { Module } from '@nestjs/common';
import { CompanyBookmarkedService } from './company-bookmarked.service';
import { CompanyBookmarkedController } from './company-bookmarked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyBookmarked } from './entities/company-bookmarked.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { Company } from '../companies/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyBookmarked, Company]),
    JwtAccessTokenModule,
  ],
  controllers: [CompanyBookmarkedController],
  providers: [CompanyBookmarkedService],
})
export class CompanyBookmarkedModule {}
