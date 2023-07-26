import { Controller, Get, Param, Delete, NotFoundException, Res, Body, Post , Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ParentService } from './parents.service';
// import { CreateParentDto } from './dto/create-parent.dto';
// import { UpdateParentDto } from './dto/update-parent.dto';
import { Response } from 'express';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { CreateParentDto } from './dto/create-parent.dto';
// import { AuthGuard } from 'src/authentication/auth.guard';
// import { RoleGuard } from 'src/authentication/role.guard';
import { UpdateParentDto } from './dto/update-parent.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
// import { ParentCategory } from './entities/parent.entity';
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  // @Post()
  // create(@Body() createParentDto: CreateParentDto) {
  //   return this.parentService.create(createParentDto);
  // }

  @Get()
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async findAll() {
    const dataCategory = await this.parentService.findAll();
    return {
      status: 200,
      success: "true",
      data: dataCategory
    }
  }

  @Post('disable/:id')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async disable(@Param('id') id: number, @Res() res: Response) {
    const updateParentUpdate = await this.parentService.disable(id);

    if (!updateParentUpdate) {
      throw new NotFoundException('Parent not found');
    }

    return res.status(200).json({
      status: 200,
      message: 'Parent disable success',
      updateParentUpdate
    })
  }

  @Post('enable/:id')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async enable(@Param('id') id: number, @Res() res: Response) {

    const updateParentUpdate = await this.parentService.enable(id);

    if (!updateParentUpdate) {
      throw new NotFoundException('Parent not found');
    }

    return res.status(200).json({
      status: 200,
      message: 'Parent disable success',
      updateParentUpdate
    })
  }

  @Post('add')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'defaultPostImage', maxCount: 1 },
    ], {
      storage: memoryStorage(),  // Save with store memory
    }),
  )
  async create(@UploadedFiles() files: { image: Express.Multer.File[], defaultPostImage: Express.Multer.File[] }, @Body() dto: CreateParentDto) {
    const createParent = await this.parentService.createParent(dto, files);
    if (!createParent) {
      throw new NotFoundException('Parent not found');
    }

    return {
      status: 200,
      message: 'Success'
    }
  }


  @Get(':id')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Param('id') id: string) {
    const parentCategory = await this.parentService.findOne(+id);

    if (!parentCategory) {
      throw new NotFoundException('Parent not found');
    }

    return {
      status: 200,
      message: 'Success',
      data: parentCategory
    }
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto): Promise<any> {
    const updateCategory = await this.parentService.update(+id, updateParentDto);

    if (updateCategory) {
      return {
        status: 200,
        message: 'Update category successfully'
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
