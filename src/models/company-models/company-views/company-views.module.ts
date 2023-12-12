import { Module } from '@nestjs/common';
import { CompanyViewsService } from './company-views.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyView } from './entities/company-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyView])],
  providers: [CompanyViewsService],
  exports: [CompanyViewsService],  
})
export class CompanyViewsModule {}
