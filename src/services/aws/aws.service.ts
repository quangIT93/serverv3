import { Injectable, Logger } from "@nestjs/common";
import { AWSConfigService } from "src/config/storage/aws/config.service";
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { ImagesTransformed } from "src/common/helper/transform/image.transform";
import { BUCKET_IMAGE_POST_UPLOAD } from "src/common/constants";

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

    async uploadImagesForPost(image: ImagesTransformed, postId: number) {
        const data = [];
        try {
            const s3 = this.getS3();
            

            const thumbnailParams: PutObjectRequest = {
                Bucket: this.awsConfig.bucket,
                Key: `${BUCKET_IMAGE_POST_UPLOAD}/${postId}/${image.thumbnail.originalname}`,
                Body: image.thumbnail.buffer,
            };

            data.push(
                {
                    ...await s3.upload(thumbnailParams).promise(),
                    originalname: image.thumbnail.originalname,
                }
            );

            for (const file of image.original) {
                const params: PutObjectRequest = {
                    Bucket: this.awsConfig.bucket,
                    Key: `${BUCKET_IMAGE_POST_UPLOAD}/${postId}/${file.originalname}`,
                    Body: file.buffer,
                };
    
                data.push({
                    ...await s3.upload(params).promise(),
                    originalname: file.originalname,
                });
            }

            console.log(data);

            return data;

        } catch (error) {
            // call delete file
            Logger.error("UPLOAD IMAGES FOR POST ERROR");
            if (data) {
                for (const file of data) {
                    await this.deleteFile(file.Key);
                }
            }
            throw error;
        }
    }

    async deleteFile(key: string) {
        try {
            const s3 = this.getS3();

            const params = {
                Bucket: this.awsConfig.bucket,
                Key: key,
            };

            const data = await s3.deleteObject(params).promise();

            return data;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }


}
