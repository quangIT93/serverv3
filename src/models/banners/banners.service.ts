import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteBannerDto } from './dto/delete-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { Repository } from 'typeorm';
import { AWSService } from "src/services/aws/aws.service";

@Injectable()
export class BannersService {
    constructor(
        @InjectRepository(Banner)
        private readonly bannersRepository: Repository<Banner>,
        private readonly awsService: AWSService    
        ) { }
    async deleteBannerService(deleteBanner: DeleteBannerDto): Promise<DeleteBannerDto | any> {
        // let imageName = deleteBanner.imageName;

        try {
            if (deleteBanner.imageName || deleteBanner.id) {
                let banner = await this.bannersRepository.findOneById(deleteBanner.id);
    
                if (!banner) {
                    throw new NotFoundException('Banner not found');
                }
        
                // Delete banner from server
                await this.bannersRepository.remove(banner);
        
                // Detele banner from S3
    
                await this.awsService.deleteFile(deleteBanner.imageName)
                
                return {
                    status: 200,
                    message: 'Banner deleted'
                }

            }  
            else {
                throw new NotFoundException('Banner not found');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
