import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import {Banner} from './entities/banner.entity'
import { AWSService } from 'src/services/aws/aws.service';
import { AWSConfigService } from 'src/config/storage/aws/config.service';
import { JwtAccessTokenService } from 'src/services/jwt/atk.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';

@Module({ 
    imports: [
        TypeOrmModule.forFeature([Banner]),
        JwtAccessTokenServiceModule
    ],
        
    controllers: [BannersController],
    providers: [BannersService, AWSService, AWSConfigService, JwtAccessTokenService, JwtService],
    exports: [BannersService ]})
export class BannersModule {
    
}
