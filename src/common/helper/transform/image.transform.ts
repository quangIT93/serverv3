import { Injectable, PipeTransform } from "@nestjs/common";
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

export interface ImagesTransformed {
    thumbnail: Express.Multer.File;
    original: Express.Multer.File[];
    resized: Express.Multer.File[];
}

@Injectable()
export class ImagesPipe implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File[]>> {
    constructor() { }
    EXT_IMAGE = '.jpg';

    async transform(files: Express.Multer.File): Promise<any> {

        if (!files) return null;

        const filesTransformed: ImagesTransformed = {
            thumbnail: {} as Express.Multer.File,
            original: [],
            resized: []
        };
        
        if (Array.isArray(files)) {
            filesTransformed.original = files.map(file => {
                return {
                    ...file,
                    originalname: `${Date.now()}-${uuidv4()}${this.EXT_IMAGE}`
                }
            });

            filesTransformed.thumbnail = await createThumbnail(files[0]);
            
            // for (const file of files) {
            //     const fileTransformed = await resize(file);
            //     filesTransformed.resized.push(...fileTransformed);
            // }
        }
        return filesTransformed; 
    }
}

async function createThumbnail(file: Express.Multer.File) {
    const { buffer } = file;
    const EXT_IMAGE = '.jpg';
    const name = `${Date.now()}-${uuidv4()}`

    const thumbnailBuffer = await sharp(buffer)
        .resize(THUMNAIL_HEIGHT, THUMNAIL_WIDTH)
        .jpeg({ quality: 80 })
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