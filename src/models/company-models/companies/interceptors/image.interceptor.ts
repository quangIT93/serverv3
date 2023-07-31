
import { Injectable, PipeTransform } from "@nestjs/common";
// import sharp from 'sharp';
// import { LOGO_COMPANY_HEIGHT, LOGO_COMPANY_WIDTH } from "src/common/constants";
// import { Readable } from "stream";
// import { v4 as uuidv4 } from "uuid";

/**
 * image interceptor for images and logo company
 * 
 * @export
 * @class CompanyImagesPipe
 * 
 * @param
 * logo: Express.Multer.File
 * images: Express.Multer.File[]
 * 
 * @description
 * create, resize logo, format png
 * create, resize, reduce images, format jpg
 * 
 */


@Injectable()
export class CompanyImagesPipe implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>> {
    constructor() { }
    MAX_TOTAL_SIZE = 1024 * 1024 * 6; // 6MB

    async transform(files: Express.Multer.File): Promise<any> {
        console.log('files pipe', files);
    }
}