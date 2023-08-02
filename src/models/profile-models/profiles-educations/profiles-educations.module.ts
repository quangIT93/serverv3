import { Module } from '@nestjs/common';
import {ProfilesEducationsController} from './profiles-educations.controller'
import {ProfilesEducationsService} from './profiles-educations.service'

@Module({   
    controllers: [ProfilesEducationsController],
    providers: [ProfilesEducationsService]
})
export class ProfilesEducationsModule {}
