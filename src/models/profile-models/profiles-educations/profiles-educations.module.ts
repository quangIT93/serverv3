import { Module } from '@nestjs/common';
import {ProfilesEducationsController} from './profiles-educations.controller'
import {ProfilesEducationsService} from './profiles-educations.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesEducation } from './entities/profiles-education.entity';
import { JwtAccessTokenModule } from 'src/providers/jwt/atk.provider.module';

@Module({   
    imports: [
        TypeOrmModule.forFeature([ProfilesEducation]),
        JwtAccessTokenModule
    ],
    controllers: [ProfilesEducationsController],
    providers: [ProfilesEducationsService],
    exports: [ProfilesEducationsService]
})
export class ProfilesEducationsModule {}
