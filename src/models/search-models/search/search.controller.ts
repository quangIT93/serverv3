import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchSuggestDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.sto';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';
import { AuthGuard } from 'src/authentication/auth.guard';
import { RoleGuard } from 'src/authentication/role.guard';

@Controller('suggest_search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async findAll() {
        return {
            statusCode: HttpStatus.OK,
            data: await this.searchService.search()
        }
    }

    @Get('/:id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async findById(@Param('id') id: number) {
        return {
            statusCode: HttpStatus.OK,
            data: await this.searchService.searchById(id)
        }
    }

    @Post('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async create(@Body() createSearchSuggestDto: CreateSearchSuggestDto) { 
        const createSearch = await this.searchService.create(createSearchSuggestDto)

        if (!createSearch) { 
            throw new NotFoundException('Create Search')
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'create search successfully'
        }
    }

    @Put('update/:id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async update(@Param('id') id: number, @Body() update : UpdateSearchDto) {

        const newUpdate = {...update, updatedAt: new Date}
        await this.searchService.update(id, newUpdate)

        return {
            statusCode: HttpStatus.OK,
            message: 'update search successfully',
        }
    }
}
