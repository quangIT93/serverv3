import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewProfileDto } from './dto/create-view_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewProfile } from './entities/view_profile.entity';
import { UserService } from '../users/users.service';

@Injectable()
export class ViewProfilesService {
  constructor(
    @InjectRepository(ViewProfile)
    private viewProfileRepository: Repository<ViewProfile>,
    private readonly userService: UserService,
  ) {}
  async create(createViewProfileDto: CreateViewProfileDto) {
    const user = await this.userService.findRoleById(
      createViewProfileDto.recruitId,
    );

    const TOTAL_IN_DAY = (user && (user?.role === 3 || user?.role === 1)) ? 10 : 3;

    if (user?.type !== 1) {
      throw new BadRequestException('Is not cruitment');
    }

    const result = await this.viewProfileRepository
      .createQueryBuilder('view_profiles')
      .where('view_profiles.recruitId = :recruitId', {
        recruitId: createViewProfileDto.recruitId,
      })
      .andWhere('DATE(view_profiles.created_at) = :today', {
        today: new Date().toISOString().split('T')[0],
      })
      .getCount();

    if (result >= TOTAL_IN_DAY) {
      return 0;
    }

    const newEntity = this.viewProfileRepository.create(createViewProfileDto);

    const data = await this.viewProfileRepository.save(newEntity);

    if (data) {
      return TOTAL_IN_DAY - (result + 1);
    }

    return TOTAL_IN_DAY - result;
  }
}
