import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Res,
  HttpStatus,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_COMANIES_LOGO_UPLOAD } from 'src/common/constants';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { Role } from 'src/common/enum';
import { Roles } from 'src/authentication/roles.decorator';
import { CompanyImagesPipe } from './interceptors/image.interceptor';
import { CreateCompanyImageDto } from '../company-images/dto/create-company-image.dto';
import { UpdateCompanyImageDto } from '../company-images/dto/delete-comapny-image.dto';
// import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly awsService: AWSService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'images', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 1024 * 1024 * 6,
        },
      },
    ),
  )
  async create(
    @UploadedFiles(
      CompanyImagesPipe,
    )
    listImages: any | undefined,
    @Req() req: CustomRequest,
    @Res() res: any,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    try {
      const { logo, images } = listImages;
      if (req.user?.id === undefined) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }
      createCompanyDto.accountId = req.user.id;
      // createCompanyDto.logo = logo.originalname;
      createCompanyDto.images = images ? images.map((image: any) => image.originalname) : [];
      const company = await this.companiesService.create(createCompanyDto);
      const uploadedObject = await this.awsService.uploadFile(logo, {
        BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
        id: String(company.id),
      });
      if (images) {
        const uploadedImages = await this.awsService.uploadMutilpleFiles(images, {
          BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
          id: String(company.id),
        });
  
        const companyImagesDto: CreateCompanyImageDto[] = uploadedImages.map((image) => ({
          companyId: company.id,
          image: image.originalname,
        }));
        await this.companiesService.createCompanyImage(companyImagesDto);
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Company created successfully',
        data: {
          ...company,
          logo: uploadedObject.Location,
          images: images ? images.map((image: any) => image.originalname) : [],
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      });
    }
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('account')
  findByAccountId(@Req() req: CustomRequest) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
    }
    return this.companiesService.findByAccountId(req.user?.id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Patch(':id')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FilesInterceptor('logo', 1, {
      fileFilter: (_req, _file, cb) => {
        if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @UploadedFiles(
      CompanyImagesPipe,
    )
    imagesList: any | undefined,
    @Req() req: CustomRequest,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      if (!updateCompanyDto.validate()) {
        return {
          // Not thing to update
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Nothing to update',
        };
      }
      updateCompanyDto.accountId = req.user?.id;

      const { logo } = imagesList;

      if (logo && logo.originalname) {
        updateCompanyDto['logo'] = logo.originalname;
      }
      const company = await this.companiesService.update(
        +req.params['id'],
        updateCompanyDto,
      );
      if (logo && logo.originalname) {
        await this.awsService.uploadFile(logo, {
          BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
          id: String(company?.id),
        });
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Company updated successfully',
        data: null
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      };
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Patch(':id/images')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      fileFilter: (_req, _file, cb) => {
        if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updateImages(
    @UploadedFiles(
      CompanyImagesPipe,
    )
    imagesList: any | undefined,
    @Req() req: CustomRequest,
    @Body() updateCompanyImage: UpdateCompanyImageDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { images } = imagesList;
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
    }
    try {
      const company = await this.companiesService.findOne(id, req.user.id);

      if (!company) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Company not found',
        };
      }

      let deletedImages: any[] = [];
      if (updateCompanyImage && updateCompanyImage?.imagesId?.length > 0) {
        deletedImages = await this.companiesService.removeCompanyImages(updateCompanyImage.imagesId, id);
      }

      if (images && images.length > 0) {
        if (updateCompanyImage && updateCompanyImage?.imagesId?.length > 0) {
          if (images.length + company.companyImages.length - deletedImages.length > 5 ) {
            return {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Maximum 5 images',
            };
          }
        } else if (images.length + company.companyImages.length > 5 ) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Maximum 5 images',
          };
        }

        const uploadedImages = await this.awsService.uploadMutilpleFiles(images, {
          BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
          id: id
        });
  
        const companyImagesDto: CreateCompanyImageDto[] = uploadedImages.map((image) => ({
          companyId: id,
          image: image.originalname,
        }));
        await this.companiesService.createCompanyImage(companyImagesDto);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Company images updated successfully',
        data: null
      };
    }
    catch (error) {
      if (error instanceof Error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong',
      };
    }
  }



  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: CustomRequest) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      };
    }
    const deleted = await this.companiesService.remove(+id, req.user?.id);

    if (deleted.affected === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Company not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Company deleted successfully',
    };
  }
}
