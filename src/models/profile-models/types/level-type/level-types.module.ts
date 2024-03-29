import { Module } from '@nestjs/common';
import { LevelTypeService } from './level-types.service';
import { LevelTypeController } from './level-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelType } from './entities/level-types.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [TypeOrmModule.forFeature([LevelType]), JwtAccessTokenModule],
  controllers: [LevelTypeController],
  providers: [LevelTypeService],
  exports: [LevelTypeService],
})
export class LevelTypeModule {}
