import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateProfilesCvDto } from '../dto/create-profiles_cv.dto';
import { ProfilesCv } from '../entities/profiles_cv.entity';
import { DataSource, EntityManager } from 'typeorm';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_CV_UPLOAD } from 'src/common/constants';

@Injectable()
export class CreateProfileCvsTransaction extends BaseTransaction<
  CreateProfilesCvDto,
  ProfilesCv
> {
  constructor(dataSource: DataSource, private readonly awsService: AWSService) {
    super(dataSource);
  }

  protected async execute(
    createProfilesCvDto: CreateProfilesCvDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const newProfileCvEntity = manager.create(
        ProfilesCv,
        createProfilesCvDto,
      );

      const newProfileCv = await manager.save(newProfileCvEntity);

      await this.awsService.uploadFileCV(createProfilesCvDto.file, {
        BUCKET: BUCKET_CV_UPLOAD,
        id: newProfileCv.id,
        accountId: createProfilesCvDto.accountId,
      });

      return newProfileCv;
    } catch (error) {
      throw new BadRequestException('Error creating profile cv');
    }
  }
}
