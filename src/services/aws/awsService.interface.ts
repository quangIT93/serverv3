import { S3 } from "aws-sdk";

export interface UploadOpions {
    /**
     * BUCKET NAME
     * @description
     * This is the prefix folder name of the file
     * 
     * @example
     * a file name has url: https://s3.amazonaws.com/folder/folder-name/file-name.jpg
     * then BUCKET is folder-name: BUCKET: 'folder/folder-name'
     * 
     * @required
     */
    BUCKET: string;

    /**
     * ID
     * @description
     * This is the folder name of the file
     * 
     * @example
     * a file name has url: https://s3.amazonaws.com/post/1/file-name.jpg
     * then ID is 1: ID: '1'
     * 
     * @optional
     */
    id?: string | number;
}

export class UploadFileResult implements S3.ManagedUpload.SendData {
    /**
     * URL of the uploaded object.
     */
    Location!: string;
    /**
     * ETag of the uploaded object.
     */
    ETag!: string;

    /**
     * Bucket to which the object was uploaded.
     */
    Bucket!: string;

    /**
     * Key to which the object was uploaded.
     */
    Key!: string;

    /**
     * Original file name
     */
    originalname!: string;

    /**
     * Generated file name
     */
    filename!: string;
}

export interface AWSServiceInterface {
    /**
     * Get S3 instance
     * @returns S3 instance
     * 
     * @description
     * This method is used to initialize S3 instance
     */
    getS3(): S3;

    /**
     * Upload file to AWS S3
     * 
     */ 
    uploadFile(file: Express.Multer.File, options: UploadOpions): Promise<UploadFileResult>;

    /**
     * Upload multiple files to AWS S3
     * 
     * @param files
     * @param options
     * @returns
     */
    uploadMutilpleFiles(files: Express.Multer.File[], options: UploadOpions): Promise<UploadFileResult[]>;

    /**
     * Delete file from AWS S3
     */
    deleteFile(key: string): Promise<void>;

    /**
     * Delete multiple files from AWS S3
     */
    deleteMultipleFiles(keys: string[]): Promise<void>;
}