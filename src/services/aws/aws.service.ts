import { Injectable, Logger } from "@nestjs/common";
import { AWSConfigService } from "src/config/storage/aws/config.service";
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { ImagesTransformed } from "src/common/helper/transform/image.transform";
import { BUCKET_IMAGE_POST } from "src/common/constants";

@Injectable()
export class AWSService {

    constructor(
        private readonly awsConfig: AWSConfigService,
    ) {}

    getS3() {
        return new S3({
            accessKeyId: this.awsConfig.accessId,
            secretAccessKey: this.awsConfig.secretKey,
            region: this.awsConfig.region,
        });

    }

    async uploadFile(file: any) {
        try {
            const s3 = this.getS3();
    
            const params: PutObjectRequest = {
                Bucket: this.awsConfig.bucket,
                Key: file.originalname,
                Body: file.buffer,
            };
    
            const data = await s3.upload(params).promise();
    
            return data;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async uploadMutilpleFiles(files: any[]) {
        try {
            const s3 = this.getS3();
            
            const data = [];

            for (const file of files) {
                const params: PutObjectRequest = {
                    Bucket: this.awsConfig.bucket,
                    Key: file.originalname,
                    Body: file.buffer,
                };
    
                data.push(await s3.upload(params).promise());
            }

            return data;

        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async uploadImagesForPost(image: ImagesTransformed) {
        try {
            const s3 = this.getS3();
            
            const data = [];

            const thumbnailParams: PutObjectRequest = {
                Bucket: this.awsConfig.bucket,
                Key: `${BUCKET_IMAGE_POST}/${image.thumbnail.originalname}`,
                Body: image.thumbnail.buffer,
            };

            data.push(await s3.upload(thumbnailParams).promise());

            for (const file of image.original) {
                const params: PutObjectRequest = {
                    Bucket: this.awsConfig.bucket,
                    Key: file.originalname,
                    Body: file.buffer,
                };
    
                data.push(await s3.upload(params).promise());
            }

            return data;

        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }


}
