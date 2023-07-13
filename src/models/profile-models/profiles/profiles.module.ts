import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAccessTokenServiceModule } from 'src/providers/jwt/atk.provider.module';
import { AWSModule } from 'src/providers/storage/aws/provider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile
    ]),
    AuthModule,
    JwtAccessTokenServiceModule,
    AWSModule,
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}
