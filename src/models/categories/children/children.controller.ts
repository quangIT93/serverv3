import { Controller, Get, Param, Delete, Post, Res, NotFoundException, Body } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { CreateChildDto } from './dto/create-child.dto';
// import { UpdateChildDto } from './dto/update-child.dto';
import { Response } from 'express';
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post('create')
  async create(@Body() createChildDto: CreateChildDto) {
    const create = await this.childrenService.create(createChildDto);

    if (!create) {
      throw new NotFoundException('Create failed');
    }
    return {
      status: 200,
      message: 'created successfully'
    }
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dataChildren = await this.childrenService.findOne(+id);

    return {
      status: 200,
      message: 'Success',
      data: dataChildren
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
  //   return this.childrenService.update(+id, updateChildDto);
  // }
  @Post('disable/:id')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async disable(@Param('id') id: number, @Res() res: Response) {
    const updateChildUpdate = await this.childrenService.disable(id);

    if (!updateChildUpdate) {
      throw new NotFoundException('Parent not found');
    }

    return res.status(200).json({
      status: 200,
      message: 'Child disable success',
      updateChildUpdate
    })
  }

  @Post('enable/:id')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RoleGuard)
  async enable(@Param('id') id: number, @Res() res: Response) {

    const updateChildUpdate = await this.childrenService.enable(id);

    if (!updateChildUpdate) {
      throw new NotFoundException('Child not found');
    }

    return res.status(200).json({
      status: 200,
      message: 'Child disable success',
      updateChildUpdate
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }

  @Get('/by-parent/:id')
  async getChildByIdParent(@Param('id') id: string) {
    const child = await this.childrenService.getChildByIdParent(+id);

    return {
      status: 200,
      message: 'Success',
      data: child
    }
  }
}
