import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
// import { CreateProfileDto } from './dto/create-profile.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
// import { plainToInstance } from 'class-transformer';
import { ProfileDetailInterceptor } from './interceptor/profile-detail.interceptor';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { AuthGuard } from 'src/authentication/auth.guard';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profilesService.create(createProfileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profilesService.findAll();
  // }

  @UseInterceptors(
    ClassSerializerInterceptor,
    ProfileDetailInterceptor,
    // ResponseInterceptor
  )
  @UseGuards(AuthGuard)
  @Get('me')
  async findOne(@Req() req: CustomRequest) {
    const id = req.user?.id;
    if (!id) {
      return null;
    }
    const profile = await this.profilesService.findOne(id);

    // const serializedProfile = Object.assign(

    return profile;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profilesService.update(+id, updateProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profilesService.remove(+id);
  // }
}
