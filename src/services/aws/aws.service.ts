import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { AWSConfigService } from "src/config/storage/aws/config.service";
import { S3 } from 'aws-sdk';
import { AWSServiceInterface, UploadFileResult, UploadOpions } from "./awsService.interface";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { BUCKET_IMAGE_PARENT, BUCKET_IMAGE_PARENT_DEFAULT } from "src/common/constants";

@Injectable()
export class AWSService implements AWSServiceInterface {

    constructor(
        @Inject(forwardRef(() => AWSConfigService))
        private readonly awsConfig: AWSConfigService,
    ) {}

    getS3() {
        return new S3({
            accessKeyId: this.awsConfig.accessId,
            secretAccessKey: this.awsConfig.secretKey,
            region: this.awsConfig.region,
        });

    }

    /**
     * Upload a file to AWS S3
     */
    async uploadFile(file: Express.Multer.File, options: UploadOpions): Promise<UploadFileResult> {
        const s3 = this.getS3();

        if (!file) {
            throw new Error('File is not exist');
        }

        if (!options.BUCKET) {
            throw new Error('Bucket is not exist');
        }

        // add bucket name to file name 
        // add id to file name if id is exist
        const key = options.BUCKET + '/' + `${options.id ? options.id + '/' : ''}` + `${file.originalname}`;

        const params: PutObjectRequest = {
            Bucket: this.awsConfig.bucket,
            Key: key,
            Body: file.buffer,
        };

        const result = await s3.upload(params).promise();

        return {
            ...result,
            originalname: file.originalname,
            filename: file.filename,
        };
    }

    /**
     * Upload multiple files to AWS S3
     */
    async uploadMutilpleFiles(files: Express.Multer.File[], options: UploadOpions): Promise<UploadFileResult[]> {
        const s3 = this.getS3();

        if (!files) {
            throw new Error('File is not exist');
        }

        if (!options.BUCKET) {
            throw new Error('Bucket is not exist');
        }

        const params: PutObjectRequest[] = [];

        files.forEach((file) => {
            // add bucket name to file name 
            // add id to file name if id is exist
            const key = options.BUCKET + '/' + `${options.id ? options.id + '/' : ''}` + `${file.originalname}`;

            params.push({
                Bucket: this.awsConfig.bucket,
                Key: key,
                Body: file.buffer,
            });
        });

        const result = await Promise.all(params.map((param) => s3.upload(param).promise()));

        return result.map((item, index) => {
            return {
                ...item,
                originalname: files[index].originalname,
                filename: files[index].filename,
            }
        });
    }

    async deleteFile(key: string): Promise<void> {
        const s3 = this.getS3();

        if (!key) {
            throw new Error('Key is not exist');
        }

        const params = {
            Bucket: this.awsConfig.bucket,
            Key: key,
        };

        await s3.deleteObject(params).promise();
    }

    async deleteMultipleFiles(keys: string[]): Promise<void> {
        // const s3 = this.getS3();

        if (!keys) {
            throw new Error('Keys is not exist');
        }
    }

    async uploadImageToS3(buffer: Buffer, originalname: string): Promise<string> {
        const s3 = this.getS3();
      
        const params = {
          Bucket: this.awsConfig.bucket,
          Key: `${BUCKET_IMAGE_PARENT}/${originalname}`,
          Body: buffer,
        };
      
        return new Promise((resolve, reject) => {
          s3.upload(params, (err : any, data : any) => {
            if (err) {
              reject(err);
            } else {
              resolve(data.Location);
            }
          });
        });
    }

    async uploadImageDefaultToS3(buffer: Buffer, originalname: string): Promise<string> {
        const s3 = this.getS3();
      
        const params = {
          Bucket: this.awsConfig.bucket,
          Key: `${BUCKET_IMAGE_PARENT_DEFAULT}/${originalname}`,
          Body: buffer,
        };
      
        return new Promise((resolve, reject) => {
          s3.upload(params, (err : any, data : any) => {
            if (err) {
              reject(err);
            } else {
              resolve(data.Location);
            }
          });
        });
    }
}
