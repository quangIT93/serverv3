import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  // FileTypeValidator,
  MaxFileSizeValidator,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesCvsService } from './profiles_cvs.service';
import { CreateProfilesCvDto } from './dto/create-profiles_cv.dto';
import { UpdateProfilesCvDto } from './dto/update-profiles_cv.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfValidator } from 'src/common/decorators/validation/pdf-validator/pdf.validator';
import { fromBuffer } from "pdf2pic"
import { v4 as uuidv4 } from "uuid";


@ApiTags('Profiles Cvs')
@Controller('profiles-cvs')
export class ProfilesCvsController {
  constructor(private readonly profilesCvsService: ProfilesCvsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProfilesCvDto: CreateProfilesCvDto,
    @Req() req: CustomRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 4 * 1024 * 1024 }),
          new PdfValidator(),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const accountId = req.user?.id;

      if (!accountId) {
        throw new BadRequestException('User not found');
      }

      createProfilesCvDto.file = file;
      createProfilesCvDto.accountId = accountId;

      const image = fromBuffer(file.buffer, {
        density: 100,
        format: "jpg",
        quality: 70,
        width: 210*2,
        height: 297*2,
      })

      const imageBuffer = await image.bulk(1, { responseType: "buffer" }).then((result) => {
        return result.map((page) => {
          return page.buffer ?? Buffer.alloc(0)
        })
      })

      const path = `${Date.now()}-${uuidv4()}`

      createProfilesCvDto.image = path + '.jpg';
      createProfilesCvDto.imageBuffer = imageBuffer[0];
      createProfilesCvDto.path = path + '.pdf';

      return {
        statusCode: HttpStatus.CREATED,
        data: await this.profilesCvsService.create(createProfilesCvDto),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error create profile cv');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProfilesCvDto: UpdateProfilesCvDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const accoundId = req.user?.id;

      if (!accoundId) {
        throw new BadRequestException('User not found');
      }

      updateProfilesCvDto.accountId = accoundId;
      updateProfilesCvDto.id = +id;

      await this.profilesCvsService.update(updateProfilesCvDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Update profile cv successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update profile cv');
    }
  }
}

