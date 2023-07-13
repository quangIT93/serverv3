import { Injectable, Logger, PipeTransform } from "@nestjs/common";
import sharp from 'sharp';
import { THUMNAIL_HEIGHT, THUMNAIL_WIDTH } from "src/common/constants";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

/**
 * Transfrom images to thumbnail, original and resized
 * 
 * @export
 * @class ImagesPipe
 * 
 */

export interface PostImagesTransformed {
    thumbnail: Express.Multer.File;
    original: Express.Multer.File[];
    resized: Express.Multer.File[];
}

@Injectable()
export class PostImagesPipe implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File[]>> {
    constructor() { }
    EXT_IMAGE = '.jpg';
    MAX_TOTAL_SIZE = 1024 * 1024 * 5; // 5MB

    async transform(files: Express.Multer.File): Promise<any> {

        if (!files) return null;

        
        const filesTransformed: PostImagesTransformed = {
            thumbnail: {} as Express.Multer.File,
            original: [],
            resized: []
        };
        
        if (Array.isArray(files)) {
            let totalSize = 0;
            
            for (const file of files) {
                totalSize += file.size;
            }

            Logger.log(`Total size of files: ${totalSize}`);
            Logger.log(`Max total size of files: ${this.MAX_TOTAL_SIZE}`);

            if (totalSize > this.MAX_TOTAL_SIZE) {
                throw new Error('Total size of files is too large');
            }

            filesTransformed.original = files.map(file => {
                return {
                    ...file,
                    originalname: `${Date.now()}-${uuidv4()}${this.EXT_IMAGE}`
                }
            });

            filesTransformed.thumbnail = await createThumbnail(files[0]);
            
        }
        return filesTransformed; 
    }
}

async function createThumbnail(file: Express.Multer.File) {
    const { buffer } = file;
    const EXT_IMAGE = '.png';
    const name = `${Date.now()}-${uuidv4()}`


    let quanlity = 100;
    if (file.size > 4000000) {
        quanlity = 5;
    } else if (file.size > 3000000) {
        quanlity = 10;
    } else if (file.size > 2000000) {
        quanlity = 30;
    } else if (file.size > 1000000) {
        quanlity = 50;
    } else if (file.size > 500000) {
        quanlity = 70;
    }

    const thumbnailBuffer = await sharp(buffer)
        .resize(THUMNAIL_HEIGHT, THUMNAIL_WIDTH)
        .png({
            adaptiveFiltering: false,
            force: false,
            quality: quanlity,
        })
        .toBuffer();

    const thumbnailFile: Express.Multer.File = {
        buffer: thumbnailBuffer,
        originalname: `${name}${EXT_IMAGE}`,
        fieldname: "",
        encoding: "",
        mimetype: "",
        size: 0,
        stream: Readable.from(thumbnailBuffer),
        destination: "",
        filename: "",
        path: ""
    };

    return thumbnailFile;
}

// async function resize(file: Express.Multer.File) {
//     const { buffer, originalname } = file;
//     const EXT_IMAGE = '.jpg';

//     const originalFile: Express.Multer.File = {
//         buffer,
//         originalname: `${originalname}${EXT_IMAGE}`,
//         fieldname: "",
//         encoding: "",
//         mimetype: "",
//         size: 0,
//         stream: Readable.from(buffer),
//         destination: "",
//         filename: "",
//         path: ""
//     };

//     return [originalFile];
// }