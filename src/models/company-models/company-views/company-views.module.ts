import { Module } from '@nestjs/common';
import { CompanyViewsService } from './company-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyView } from './entities/company-view.entity';
import { Company } from '../companies/entities/company.entity';
import { CompanyViewsController } from './company-view.controller';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { User } from 'src/models/users/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyView, Company, User]),
    JwtAccessTokenModule,
  ],
  controllers: [CompanyViewsController],
  providers: [CompanyViewsService],
  exports: [CompanyViewsService],
})
export class CompanyViewsModule {}
