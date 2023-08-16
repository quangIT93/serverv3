import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  UploadedFiles,
  BadRequestException,
  Put,
  ParseIntPipe,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBasicAuth, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CommunicationImagesPipe } from './interceptors/image.interceptor';
import { CommunicationInterceptor } from './interceptors/communication.interceptor';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { RoleGuard } from 'src/authentication/role.guard';
import { ResizeImageResult } from 'src/common/helper/transform/resize-image';

@ApiTags('Communications')
@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBasicAuth()
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]),
  )
  async create(
    @Body() createCommunicationDto: CreateCommunicationDto,
    @Req() req: CustomRequest,
    @Res() res: any,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: ResizeImageResult[] | undefined,
  ) {
    try {

      if (!req.user?.id) {
        return new UnauthorizedException();
      }

      createCommunicationDto.accountId = req.user.id;
      
      createCommunicationDto.images = listImages;

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Create communication successfully',
        data: await this.communicationsService.create(createCommunicationDto),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error creating communication');
    }
  }

  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({
    name: 'sort',
    description: 'cm (comments), l (likes), v (views).',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  async findAll(
    @Req() req: CustomRequest,
    @Query('sort') sort: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    try {
      const id = req.user?.id;

      if (!id) {
        return null;
      }

      if (sort) {
        return await this.communicationsService.findAll(
          limit ? +limit : 20,
          page ? +page : 1,
          sort,
        );
      }

      return await this.communicationsService.findAll(
        limit ? +limit : 20,
        page ? +page : 1,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication');
    }
  }

  @Get('/by-account')
  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'sort',
    description: 'cm (comments), l (likes), v (views).',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  async findOne(
    @Req() req: CustomRequest,
    @Query('sort') sort: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    try {
      const id = req.user?.id ? req.user?.id : '';
      if (id === '') {
        throw new BadRequestException('User not found');
      }

      if (sort) {
        return await this.communicationsService.findCommunicationByAccountId(
          id,
          limit ? +limit : 20,
          page ? +page : 1,
          sort,
        );
      }

      return await this.communicationsService.findCommunicationByAccountId(
        id,
        limit ? +limit : 20,
        page ? +page : 1,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication');
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileFieldsInterceptor([{ name: 'images', maxCount: 5 }], {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
    @UploadedFiles(CommunicationImagesPipe)
    listImages: any | undefined,
    @Req() req: CustomRequest,
  ) {
    try {
      const { images } = listImages;
      updateCommunicationDto.id = id;
      updateCommunicationDto.accountId = req.user?.id;
      updateCommunicationDto.images = images;

      await this.communicationsService.update(updateCommunicationDto);
      return {
        status: HttpStatus.OK,
        message: 'Updated communication successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error update communication');
    }
  }

  @Delete('/by-admin/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @Roles(Role.ADMIN)
  async remove(
    @Param('id') id: number,
    // @Req() req: CustomRequest,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
  ) {
    // updateCommunicationDto.accountId = req.user?.id ? req.user.id : '';
    updateCommunicationDto.id = id;
    await this.communicationsService.remove(updateCommunicationDto);
    return {
      status: HttpStatus.OK,
      message: 'Delete communication successfully',
    };
  }

  // @Get('by-name')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  // async getByName(@Req() req: any) {
  //   try {
  //     const search = req.query.search;
  //     return await this.communicationsService.searchCommunication(search);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new BadRequestException(error.message);
  //     }
  //     throw new BadRequestException('Error search communication');
  //   }
  // }

  @Get('/today')
  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'sort',
    description: 'cm (comments), l (likes), v (views).',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  async getCommunicationToday(
    @Query('sort') sort: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    try {
      return await this.communicationsService.getCommunicationToday(
        limit ? +limit : 20,
        page ? +page : 1,
        sort,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error find communication today');
    }
  }

  @Get('/share/:id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @UseGuards(AuthGuard)
  async shareCommunication(@Param('id') id: string) {
    try {
      return {
        status: HttpStatus.OK,
        data: await this.communicationsService.shareCommunication(+id),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error share communication');
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of communication.',
    required: true,
  })
  @UseInterceptors(ClassSerializerInterceptor, CommunicationInterceptor)
  async getByCommunicationId(@Param('id') id: string) {
    try {
      return await this.communicationsService.getCommunicationByCommunicationId(
        +id,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error find communication by communicationId',
      );
    }
  }
}
