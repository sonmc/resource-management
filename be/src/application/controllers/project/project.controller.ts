import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetProjectsUseCases } from 'src/usecases/project/get-projects.usecases';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';
import { ProjectPresenter } from './presenter/project.presenter';
import { CreateProjectUseCases } from 'src/usecases/project/add-project.usecases';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { AddMemberPresenter } from './presenter/add-member.presenter';
import { AddMemberUseCases } from 'src/usecases/project/add-member.usercase';
import { AddMemberEntity } from 'src/domain/entities/add-member.entity';
import { UserPresenter } from './presenter/user-presenter';

@Controller('projects')
@ApiTags('projects')
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class ProjectController {
    constructor(
        @Inject(UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY)
        private readonly getProjectsUsecaseProxy: UseCaseProxy<GetProjectsUseCases>,
        @Inject(UsecasesProxyModule.CREATE_PROJECT_USECASES_PROXY)
        private readonly createProjectsUsecaseProxy: UseCaseProxy<CreateProjectUseCases>,
        @Inject(UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY)
        private readonly addMemberUsecaseProxy: UseCaseProxy<AddMemberUseCases>
    ) {}

    @Get()
    async get() {
        const projects = await this.getProjectsUsecaseProxy.getInstance().execute();
        const response = projects.map((p) => new ProjectPresenter(p));
        return response;
    }

    @Post()
    async Create(@Req() request: any) {
        const project = new ProjectEntity();
        const projectEntity = await this.createProjectsUsecaseProxy.getInstance().execute(project);
        const response = new ProjectPresenter(projectEntity);
        return response;
    }

    @Post('add-member')
    async addMember(@Body() addMemberPresenter: AddMemberPresenter) {
        const addMemberEntity = new AddMemberEntity();
        const useEntity = await this.addMemberUsecaseProxy.getInstance().execute(addMemberEntity);
        const response = new UserPresenter(useEntity);
        return response;
    }
}
