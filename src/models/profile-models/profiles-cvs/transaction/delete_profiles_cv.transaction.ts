import { DataSource, EntityManager, In } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/providers/database/mariadb/transaction';
import { ProfilesCv } from '../entities/profiles_cv.entity';
import { DeleteProfilesCvDto } from '../dto/delete-profiles_cv.dto';

@Injectable()
export class DeleteProfileCvsTransaction extends BaseTransaction<
  DeleteProfilesCvDto,
  ProfilesCv
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    deleteProfilesCvDto: DeleteProfilesCvDto,
    manager: EntityManager,
  ): Promise<any> {
    try {
      const idSet = new Set(deleteProfilesCvDto.ids);

      const dataDelete = await manager.delete(ProfilesCv, {
        id: In([...idSet]),
        accountId: deleteProfilesCvDto.accountId,
      });

      return dataDelete.affected;
    } catch (error) {
      throw new BadRequestException('Error creating profile cv');
    }
  }
}
