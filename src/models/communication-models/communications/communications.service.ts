import { Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { Repository } from 'typeorm';
import { Observable, from, map } from 'rxjs';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from 'src/common/constants';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
    private readonly createCommunicationTransaction: CreateCommunicationTransaction,
    private readonly awsService: AWSService
    ){}
  async create(images : any, createCommunicationDto: CreateCommunicationDto)  {
    try {
      const newCommunication = await this.createCommunicationTransaction.run(createCommunicationDto)

      if (images) {
        const image = await this.awsService.uploadMutilpleFiles(images, {
          BUCKET: BUCKET_IMAGE_COMMUNICATION_UPLOAD,
          id: String(newCommunication.id),
        });

        console.log(image);
      }

      return newCommunication
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return from(this.communicationRepository.find())
      .pipe(
        map((communication: Communication[] | null) => communication || undefined)
      );
  }

  findCommunicationById(id: number): Observable<Communication | undefined> {
    return from(this.communicationRepository
    .findOne({ where: { id } }))
    .pipe(
      map((communication: Communication | null) => communication || undefined)
    );
  }

  update(id: number, _updateCommunicationDto: UpdateCommunicationDto) {
    return `This action updates a #${id} communication`;
  }

  remove(id: number) {
    return `This action removes a #${id} communication`;
  }
}
