import { Module } from '@nestjs/common';
import { ProfilesAwardsService } from './profiles-awards.service';
import { ProfilesAwardsController } from './profiles-awards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesAward } from './entities/profiles-award.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesAward]),
    JwtAccessTokenModule
  ],
  controllers: [ProfilesAwardsController],
  providers: [ProfilesAwardsService],
  exports: [ProfilesAwardsService]
})
export class ProfilesAwardsModule {}
