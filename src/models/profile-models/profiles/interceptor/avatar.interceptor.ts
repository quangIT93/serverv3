import { Injectable, PipeTransform } from '@nestjs/common';
import { ImageValidator } from 'src/common/decorators/validation/image-validator/image.validator';
import { createResizeImage } from 'src/common/helper/transform/resize-image';

@Injectable()
export class AvatarImagePipe
  implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>>
{
  constructor() {}
  async transform(file: any): Promise<any> {
    try {
      if (!file) {
        return null;
      }

      if (!(await new ImageValidator().isValid(file))) {
        throw new Error('Image must be image');
      }

      return await createResizeImage(file, {
        width: 512,
        height: 512,
        ext: 'png',
      });
    } catch (error) {
      throw error;
    }
  }
}
