import { RolePresenter } from './dto/role.presenter';
import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('roles')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(RolePresenter)
export class RoleController {
    constructor() {}
}
