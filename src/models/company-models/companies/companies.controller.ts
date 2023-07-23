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
  ParseFilePipeBuilder,
  Req,
  Res,
  HttpStatus,
  // Req,
  // Res,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBasicAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageValidator } from 'src/common/decorators/validation/image-validator/image.validator';
import { ImagePipe } from 'src/common/helper/transform/image.transform';
import { AWSService } from 'src/services/aws/aws.service';
import { BUCKET_IMAGE_COMANIES_LOGO_UPLOAD } from 'src/common/constants';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { Role } from 'src/common/enum';
import { Roles } from 'src/authentication/roles.decorator';
// import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly awsService: AWSService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBasicAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('logo', 1, {
      fileFilter: (_req, _file, cb) => {
        if (!_file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 2 })
        .addValidator(
          new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }),
        )
        .build({
          fileIsRequired: false,
          exceptionFactory: (errors) => {
            return new Error(errors);
          },
        }),
      ImagePipe,
    )
    logo: Express.Multer.File,
    @Req() req: CustomRequest,
    @Res() res: any,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    try {
      createCompanyDto.accountId = req.user?.id;
      createCompanyDto['logo'] = logo.originalname;
      const company = await this.companiesService.create(createCompanyDto);
      const uploadedObject = await this.awsService.uploadFile(logo, {
        BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
        id: String(company.id),
      });
  
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Company created successfully',
        data: {
          ...company,
          logo: uploadedObject.Location
          ,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
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

  @ApiBasicAuth('JWT-auth')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companiesService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
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
  @Patch(':id')
  @UseInterceptors(
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
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 2 })
        .addValidator(
          new ImageValidator({ mime: /\/(jpg|jpeg|png|gif|bmp|webp)$/ }),
        )
        .build({
          fileIsRequired: false,
          exceptionFactory: (errors) => {
            return new Error(errors);
          },
        }),
      ImagePipe,
    )
    logo: Express.Multer.File | undefined,
    @Req() req: CustomRequest,
    // @Res() res: any,
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
      if (logo && logo.originalname) {
        updateCompanyDto['logo'] = logo.originalname;
      }
      const company = await this.companiesService.update(
        +req.params['id'],
        updateCompanyDto,
      );
      let uploadedObject: any
      if (logo && logo.originalname) {
        uploadedObject = await this.awsService.uploadFile(logo, {
          BUCKET: BUCKET_IMAGE_COMANIES_LOGO_UPLOAD,
          id: String(company?.id),
        });
      }

    return {
      statusCode: HttpStatus.OK,
      message: 'Company updated successfully',
      data: {
        ...company,
        logo: uploadedObject?.Location || company?.logo || null,
      },
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
  @ApiBasicAuth('JWT-auth')
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
