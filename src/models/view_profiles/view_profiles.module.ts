import { Module } from '@nestjs/common';
import { ViewProfilesService } from './view_profiles.service';
import { ViewProfilesController } from './view_profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewProfile } from './entities/view_profile.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { UserModule } from '../users/users.module';
import { CompaniesModule } from '../company-models/companies/companies.module';
import { CompaniesService } from '../company-models/companies/companies.service';
import { Company } from '../company-models/companies/entities/company.entity';
import { CompanyImagesModule } from '../company-models/company-images/company-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewProfile, Company]),
    JwtAccessTokenServiceModule,
    UserModule,
    CompaniesModule,
    CompanyImagesModule,
  ],
  controllers: [ViewProfilesController],
  providers: [ViewProfilesService, CompaniesService],
  exports: [ViewProfilesService],
})
export class ViewProfilesModule {}
