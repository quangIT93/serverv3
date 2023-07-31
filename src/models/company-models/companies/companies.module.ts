import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
// import { AWSConfigService } from 'src/config/storage/aws/config.service';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company
    ]),
    JwtAccessTokenServiceModule,
    AWSModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
