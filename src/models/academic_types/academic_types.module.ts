import { Module } from '@nestjs/common';
import { AcademicTypesService } from './academic_types.service';
import { AcademicTypesController } from './academic_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicType } from './entities/academic_type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicType])
  ],
  controllers: [AcademicTypesController],
  providers: [AcademicTypesService],
  exports: [AcademicTypesService]
})
export class AcademicTypesModule {}
