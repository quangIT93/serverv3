import { Module } from '@nestjs/common';
import { LanguageTypesService } from './language-types.service';
import { LanguageTypesController } from './language-types.controller';
import { LanguageType } from './entities/language-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageType]),
    JwtAccessTokenModule
  ],
  controllers: [LanguageTypesController],
  providers: [LanguageTypesService],
  exports: [LanguageTypesService],
})
export class LanguageTypesModule {}
