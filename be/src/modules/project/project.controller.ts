import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Project')
@UseGuards(JwtStrategy)
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        return await this.projectService.create(createProjectDto);
    }

    @Get()
    async findAll() {
        return await this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.projectService.findOne(+id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.projectService.remove(+id);
    }
}
