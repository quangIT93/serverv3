import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { CreateProfilesCvDto } from '../dto/create-profiles_cv.dto';
import { ProfilesCv } from '../entities/profiles_cv.entity';
import { DataSource, EntityManager } from 'typeorm';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_CV_UPLOAD } from 'src/common/constants';
import { FileUpload } from 'src/services/aws/awsService.interface';
import { UserService } from 'src/models/users/users.service';

@Injectable()
export class CreateProfileCvsTransaction extends BaseTransaction<
  CreateProfilesCvDto,
  ProfilesCv
> {
  constructor(
    dataSource: DataSource,
    private readonly awsService: AWSService,
    private readonly userService: UserService,
  ) {
    super(dataSource);
  }

  protected async execute(
    createProfilesCvDto: CreateProfilesCvDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const TOTAL_CV = 10;

      const user = await this.userService.findRoleById(
        createProfilesCvDto.accountId,
      );

      if (user?.type === 1) {
        throw new BadRequestException('Is not candidate');
      }

      const result = await manager
        .createQueryBuilder(ProfilesCv, 'profiles_cvs')
        .where('profiles_cvs.accountId = :accountId', {
          accountId: createProfilesCvDto.accountId,
        })
        .getCount();

      if (result >= TOTAL_CV) {
        throw new BadRequestException(
          'Not enough pointsYou can only save a maximum of 10 CVs. Please delete unused CVs or edit old CVs at the CV Management page',
        );
      }

      const newProfileCvEntity = manager.create(
        ProfilesCv,
        createProfilesCvDto,
      );

      const newProfileCv = await manager.save(newProfileCvEntity);

      const pdfUpload: FileUpload = {
        buffer: createProfilesCvDto.file.buffer,
        originalname: createProfilesCvDto.path,
      };

      await this.awsService.uploadFileCV(pdfUpload, {
        BUCKET: BUCKET_CV_UPLOAD,
        id: newProfileCv.id,
        accountId: createProfilesCvDto.accountId,
      });

      const imageFileUpload: FileUpload = {
        buffer: Buffer.from(createProfilesCvDto.imageBuffer),
        originalname: createProfilesCvDto.image,
      };

      await this.awsService.uploadFileCV(imageFileUpload, {
        BUCKET: BUCKET_CV_UPLOAD,
        id: newProfileCv.id,
        accountId: createProfilesCvDto.accountId,
      });

      return newProfileCv;
    } catch (error) {
      throw error;
    }
  }
}
