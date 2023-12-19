import { Module } from '@nestjs/common';
import { CompanyDescriptionTemplatesService } from './company-description-templates.service';
import { CompanyDescriptionTemplatesController } from './company-description-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDescriptionTemplate } from './entities/company-description-template.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyDescriptionTemplate]),
    JwtAccessTokenServiceModule,
  ],
  controllers: [CompanyDescriptionTemplatesController],
  providers: [CompanyDescriptionTemplatesService],
})
export class CompanyDescriptionTemplatesModule {}
