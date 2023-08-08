import { Injectable } from "@nestjs/common";
import { BaseTransaction } from "src/providers/database/mariadb/transaction";
import { CreateCommunicationDto } from "../dto/create-communication.dto";
import { Communication } from "../entities/communication.entity";
import { DataSource, EntityManager } from "typeorm";
// import { AWSService } from "src/services/aws/aws.service";
import { CommunicationImagesService } from "../../communication-images/communication-images.service";
import { CommunicationCategoriesService } from "../../communication-categories/communication-categories.service";
import { CreateCommunicationImageDto } from "../../communication-images/dto/create-communication-image.dto";
import { CreateCommunicationCategoriesDto } from "../../communication-categories/dto/create-communication-categories.dto";
// import { BUCKET_IMAGE_COMMUNICATION_UPLOAD } from "src/common/constants";

@Injectable()
export class CreateCommunicationTransaction extends BaseTransaction<
    CreateCommunicationDto,
    Communication
>
{
    constructor(
        dataSource : DataSource,
        // private awsService: AWSService,
        private communicationImagesService: CommunicationImagesService,
        private communicationCategoriesService : CommunicationCategoriesService
    ) 
    {
        super(dataSource);
    }
    protected async execute(
        createCommunicationDto: CreateCommunicationDto, 
        manager: EntityManager 
    ): Promise<Communication> 
    {
        try {
            const newCommunicationEntity = manager.create(Communication, createCommunicationDto)
            const newCommunication = await manager.save(newCommunicationEntity)

            const newCommunicationImageDto = createCommunicationDto.images?.map((image) =>
                ({
                    communicationId: newCommunication.id,
                    image
                })
            )
            const newCommunicationCategoriesDto = createCommunicationDto.categoryId?.map((category) =>
            ({
                communicationId: newCommunication.id,
                categoryId: category
            })
            )

            // save in communication images
            await this.communicationImagesService.createMany(newCommunicationImageDto as CreateCommunicationImageDto[], manager);
            // save in communication category
            await this.communicationCategoriesService.createMany(newCommunicationCategoriesDto as CreateCommunicationCategoriesDto[], manager)
            return newCommunication;
        } catch (error) {
            throw new Error("Create communication failed.");
        }
    }
}