import { Module } from '@nestjs/common';
import { ProfilesSkillsService } from './profiles-skills.service';
import { ProfilesSkillsController } from './profiles-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesSkill } from './entities/profiles-skill.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';
import { LevelTypeModule } from '../types/level-type/level-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilesSkill]),
    LevelTypeModule,
    JwtAccessTokenModule
  ],
  controllers: [ProfilesSkillsController],
  providers: [ProfilesSkillsService],
  exports: [ProfilesSkillsService]
})
export class ProfilesSkillsModule {}
