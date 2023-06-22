// import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { JwtAccessTokenService } from 'src/services/jwt/atk.service';

@Module({
  imports: [
    JwtModule.registerAsync({
        imports: [JwtConfigModule],
        inject: [JwtConfigService],
        useFactory: (configService: JwtConfigService) => ({
            secret: configService.accessTokenSecret,
            signOptions: {
                expiresIn: configService.accessTokenExpiresIn,
            },
        }),
    }),
  ],
  providers: [JwtAccessTokenService],
  exports: [JwtAccessTokenService],
  controllers: [],
})
export class JwtAccessTokenServiceModule {}
