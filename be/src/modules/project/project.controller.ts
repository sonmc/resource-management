import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddMemberDto } from './dto/add-member.dto';

@UseGuards(JwtStrategy)
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        return await this.projectService.create(createProjectDto);
    }

    @Post("add-member")
    async addMember(@Body() addMemberDto: AddMemberDto) {
        return await this.projectService.addMember(addMemberDto);
    }

    @Get()
    async findAll() {
        return await this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.projectService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(+id, updateProjectDto);
    }


}
