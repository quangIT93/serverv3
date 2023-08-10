import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { Repository } from 'typeorm';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';
import { UpdateCommunicationTransaction } from './transactions/update-communication.transaction';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
    private readonly createCommunicationTransaction: CreateCommunicationTransaction,
    private readonly awsService: AWSService,
    private readonly updateCommunicationTransaction: UpdateCommunicationTransaction,
  ) {}
  async create(images: any, createCommunicationDto: CreateCommunicationDto) {
    try {
      const newCommunication = await this.createCommunicationTransaction.run(
        createCommunicationDto,
      );

      if (images) {
        await this.awsService.uploadMutilpleFiles(images, {
          BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
          id: String(newCommunication.id),
        });
      }

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.communicationRepository.find({
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
      ],
    });
  }

  async findCommunicationById(id: string) {
    return await this.communicationRepository.find({
      where: {
        accountId: id,
      },
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
      ],
    });
  }

  async update(updateCommunicationDto: UpdateCommunicationDto, images: any) {
    try {
      const newCommunication = await this.updateCommunicationTransaction.run(
        updateCommunicationDto,
      );
      if (images) {
        await this.awsService.uploadMutilpleFiles(images, {
          BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
          id: String(newCommunication.id),
        });
      }

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  async remove(updateCommunicationDto: UpdateCommunicationDto) {
    const exitsCommunication = await this.communicationRepository.findOne({
      where: {
        accountId: updateCommunicationDto.accountId,
      },
    });

    if (!exitsCommunication) {
      throw new BadRequestException(
        'Communication not found or communication does not exist of user',
      );
    }

    updateCommunicationDto.status = 0;

    const newUpdate = this.communicationRepository.create(
      updateCommunicationDto,
    );

    await this.communicationRepository.save(newUpdate);
  }

  async searchCommunication(searchTitle: string) {
    const communications = await this.communicationRepository
      .createQueryBuilder('communications')
      .where('communications.title like :search', {
        search: '%' + searchTitle + '%',
      })
      .leftJoinAndSelect(
        'communications.communicationImages',
        'communicationImages',
      )
      .leftJoinAndSelect(
        'communications.communicationCategories',
        'communicationCategories',
      )
      .leftJoinAndSelect(
        'communicationCategories.parentCategory',
        'parentCategory',
      )
      .getMany();

    return communications;
  }

  async getCommunicationByCommunicationId(id: number) {
    return await this.communicationRepository.find({
      where: {
        id,
      },
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
      ],
    });
  }
}
