import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
// import { AWSConfigService } from 'src/config/storage/aws/config.service';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';
import { CompanyImagesModule } from '../company-images/company-images.module';
import { SiteService } from 'src/models/site/site.service';
import { GoogleMapProvider } from 'src/models/site/google-map.provider';
import { CompanyViewsModule } from '../company-views/company-views.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    JwtAccessTokenServiceModule,
    AWSModule,
    CompanyImagesModule,
    CompanyViewsModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, SiteService, GoogleMapProvider],
})
export class CompaniesModule {}
