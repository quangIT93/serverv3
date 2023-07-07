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
import { BUCKET_IMAGE_COMANIES_LOGO } from 'src/common/constants';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
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
    FilesInterceptor('image', 1, {
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
    image: Express.Multer.File,
    @Req() req: CustomRequest,
    // @Res() res: any,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    createCompanyDto.accountId = req.user?.id;
    createCompanyDto['logo'] = image.originalname;
    const company = await this.companiesService.create(createCompanyDto);
    const uploadedObject = await this.awsService.uploadFile(image, {
      BUCKET: BUCKET_IMAGE_COMANIES_LOGO,
      id: String(company.id),
    });

    return {
      ...company,
      logo: uploadedObject.Key,
    };
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
