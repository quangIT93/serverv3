import { Module } from '@nestjs/common';
import { ParentService } from './parents.service';
import { ParentController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent.entity';
import { JwtAccessTokenService } from 'src/services/jwt/atk.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { ChildCategory } from '../children/entities/child.entity';
import { ChildrenService } from '../children/children.service';
import { MulterModule } from '@nestjs/platform-express';
import { AWSService } from 'src/services/aws/aws.service';
import { AWSConfigService } from 'src/config/storage/aws/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParentCategory, ChildCategory
    ]),
    MulterModule.register({
      dest: './uploads', // Thư mục lưu trữ tệp tải lên
    }),
    JwtAccessTokenServiceModule
  ],
  controllers: [ParentController],
  providers: [ParentService, ChildrenService , JwtAccessTokenService, JwtService, AWSService, AWSConfigService]
})
export class ParentModule {}
