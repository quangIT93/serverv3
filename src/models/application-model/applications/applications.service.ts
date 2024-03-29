import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {

  constructor(
    @InjectRepository(Application)
    private readonly applicationsRepository: Repository<Application>
  ) { }

  create(_createApplicationDto: CreateApplicationDto) {
    return 'This action adds a new application';
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  findOneByPostIdAndAccountId(postId: number, accountId: string) {
    return this.applicationsRepository.findOne({
      where: {
        postId,
        accountId
      }
    });
  }

  async getLogsApplicationByAccountId(accountId: string) {
    return await this.applicationsRepository.createQueryBuilder('application')
      .select('MONTH(application.created_at)', 'month')
      .addSelect('YEAR(application.created_at)', 'year')
      .addSelect('COUNT(*)', 'count')
      .where('application.account_id = :accountId', { accountId })
      .groupBy('month, year')
      .orderBy('year, month', 'DESC')
      .getRawMany();
  }

  async getLogsApplicationByRecruiterId(recruiterId: string) {
    return await this.applicationsRepository.createQueryBuilder('application')
      .select('MONTH(application.created_at)', 'month')
      .addSelect('YEAR(application.created_at)', 'year')
      .addSelect('COUNT(*)', 'count')
      .where('application.post_id IN (SELECT id FROM posts WHERE account_id = :recruiterId)', { recruiterId })
      .groupBy('month, year')
      .orderBy('year, month', 'DESC')
      .getRawMany();
  }

  async getTotalApplicationByAccountId(accountId: string) {
    return await this.applicationsRepository.createQueryBuilder('application')
      .select('COUNT(*)', 'count')
      .where('application.account_id = :accountId', { accountId })
      .getRawOne();
  }

  async getTotalApplicationByRecruiterId(recruiterId: string) {
    return await this.applicationsRepository.createQueryBuilder('application')
      .select('COUNT(*)', 'count')
      .where('application.post_id IN (SELECT id FROM posts WHERE account_id = :recruiterId)', { recruiterId })
      .getRawOne();
  }

  update(id: number, _updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
