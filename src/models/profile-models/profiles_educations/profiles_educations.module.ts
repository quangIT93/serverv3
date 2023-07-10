import { Module } from '@nestjs/common';
import {ProfilesEducationsController} from './profiles_educations.controller'
import {ProfilesEducationsService} from './profiles_educations.service'

@Module({   
    controllers: [ProfilesEducationsController],
    providers: [ProfilesEducationsService]
})
export class ProfilesEducationsModule {}
