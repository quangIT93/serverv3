import { Module } from '@nestjs/common';
import { ProfilesIntershipsService } from './profiles-interships.service';
import { ProfilesIntershipsController } from './profiles-interships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesIntership } from './entities/profiles-intership.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesIntership]),
    JwtAccessTokenModule
  ],
  controllers: [ProfilesIntershipsController],
  providers: [ProfilesIntershipsService],
  exports: [ProfilesIntershipsService]
})
export class ProfilesIntershipsModule {}
