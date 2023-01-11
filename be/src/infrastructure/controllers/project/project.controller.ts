import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectPresenter } from './dto/\u001Dproject.\u001Dpresenter';

@Controller('projects')
@ApiTags('projects')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProjectPresenter)
export class ProjectController {
    constructor() {}
}
