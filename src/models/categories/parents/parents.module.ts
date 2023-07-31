import { Module } from '@nestjs/common';
import { ParentService } from './parents.service';
import { ParentController } from './parents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentCategory } from './entities/parent.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { ChildCategory } from '../children/entities/child.entity';
// import { ChildrenModule } from '../children/children.module';
import { AWSService } from 'src/services/aws/aws.service';
import { AWSConfigService } from 'src/config/storage/aws/config.service';
import { ChildrenService } from '../children/children.service';
// import { AWSModule } from 'src/providers/storage/aws/provider.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParentCategory, ChildCategory
    ]),
    JwtAccessTokenServiceModule,
    // ChildrenModule,
    // AWSModule
  ],
  controllers: [ParentController],
  providers: [ParentService, AWSService, AWSConfigService, ChildrenService]
})
export class ParentModule {}
