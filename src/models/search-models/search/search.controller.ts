import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { SearchService } from './search.service';
import { createSearchSuggestDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.sto';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/common/enum';

@Controller('suggest_search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get()
    @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RoleGuard)
    async findAll() {
        const search = await this.searchService.search()

        return {
            statusCode: 200,
            data: search
        }
    }

    @Get('/:id')
    @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RoleGuard)
    async findById(@Param('id') id: number) {
        const search = await this.searchService.searchById(id)

        return {
            statusCode: 200,
            data: search
        }
    }

    @Post('create')
    @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RoleGuard)
    async create(@Body() createSearchSuggestDto: createSearchSuggestDto) { 
        const createSearch = await this.searchService.create(createSearchSuggestDto)

        if (!createSearch) { 
            throw new NotFoundException('Create Search')
        }

        return {
            statusCode: 200,
            message: 'create search successfully'
        }
    }

    @Get('disable/:id')
    @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RoleGuard)
    async disable(@Param('id') id: number) {
        const updateSearch = await this.searchService.disable(id)

        if (updateSearch.affected === 0){
            throw new NotFoundException('Update search failed')
        }

        return {
            statusCode: 200,
            message: 'update search successfully'
        }
    }


    @Get('enable/:id')
    @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RoleGuard)
    async enable(@Param('id') id: number) {
        const updateSearch = await this.searchService.enable(id)

        if (updateSearch.affected === 0){
            throw new NotFoundException('Update search failed')
        }

        return {
            statusCode: 200,
            message: 'update search successfully'
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() update : UpdateSearchDto) {
        const newUpdate = {...update, updatedAt: new Date}
        await this.searchService.update(id, newUpdate)

        return {
            statusCode: 200,
            message: 'update search successfully',
        }
    }
}
