import { Module } from '@nestjs/common';
import { CompanyBookmarkedService } from './company-bookmarked.service';
import { CompanyBookmarkedController } from './company-bookmarked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyBookmarked } from './entities/company-bookmarked.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyBookmarked]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [CompanyBookmarkedController],
  providers: [CompanyBookmarkedService],
})
export class CompanyBookmarkedModule {}
