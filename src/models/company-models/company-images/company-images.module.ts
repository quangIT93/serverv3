import { Module } from '@nestjs/common';
import { CompanyImagesService } from './company-images.service';
import { CompanyImagesController } from './company-images.controller';

@Module({
  controllers: [CompanyImagesController],
  providers: [CompanyImagesService]
})
export class CompanyImagesModule {}
