import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRatingsService } from './company-ratings.service';
import { CompanyRatingsController } from './company-ratings.controller';
import { Company } from '../companies/entities/company.entity';
import { CompanyRating } from './entities/company-rating.entity';
import { User } from 'src/models/users/entities';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyRating, Company, User]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [CompanyRatingsController],
  providers: [CompanyRatingsService],
})
export class CompanyRatingsModule {}
