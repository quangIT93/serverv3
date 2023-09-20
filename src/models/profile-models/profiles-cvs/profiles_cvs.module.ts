import { Module } from '@nestjs/common';
import { ProfilesCvsService } from './profiles_cvs.service';
import { ProfilesCvsController } from './profiles_cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesCv } from './entities/profiles_cv.entity';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { CreateProfileCvsTransaction } from './transaction/profiles_cv.transaction';
import { AWSService } from 'src/services/aws/aws.service';
import { AWSConfigModule } from 'src/config/storage/aws/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesCv]),
    JwtAccessTokenServiceModule,
    AWSConfigModule
  ],
  controllers: [ProfilesCvsController],
  providers: [ProfilesCvsService, CreateProfileCvsTransaction, AWSService],
  exports: [ProfilesCvsService]
})
export class ProfilesCvsModule {}
