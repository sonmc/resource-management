import { CacheInterceptor, CacheTTL, Controller, Inject } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetProjectsUseCases } from 'src/use-cases/project/get-projects.usecases';
import { Body, Get, Post, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { ProjectPresenter } from './presenter/project.presenter';
import { CreateProjectUseCases } from 'src/use-cases/project/create-project.usecases';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { AddMemberUseCases } from 'src/use-cases/project/add-member-to-project.usercase';
import { plainToClass } from 'class-transformer';
import { UserProjectPresenter } from './presenter/user-project.presenter';
import { AddMemberEntity } from 'src/domain/entities/add-member.entity';
import { UserPresenter } from './presenter/user-presenter';
import { CreateProjectPresenter } from './presenter/create-project.presenter';
import { UserEntity } from 'src/domain/entities/user.entity';
import { generateWorkload } from 'src/actions/workload.action';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { EndPoint } from 'src/domain/enums/endpoint.enum';
import { ProjectRepository } from 'src/presentation/repositories/project.repository';

@UseInterceptors(CacheInterceptor)
@Controller('projects')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProjectController {
    constructor(
        @Inject(UseCasesProxyModule.GET_PROJECTS_USECASES_PROXY)
        private readonly getProjectsUsecaseProxy: UseCaseProxy<GetProjectsUseCases>,
        @Inject(UseCasesProxyModule.CREATE_PROJECT_USECASES_PROXY)
        private readonly createProjectsUsecaseProxy: UseCaseProxy<CreateProjectUseCases>,
        @Inject(UseCasesProxyModule.ADD_MEMBER_USECASES_PROXY)
        private readonly addMemberUsecaseProxy: UseCaseProxy<AddMemberUseCases>,
        private readonly projectRepository: ProjectRepository
    ) {}

    @CacheTTL(10)
    @Permissions(EndPoint.PROJECT_GET)
    @Get()
    async getAll(@Query() query): Promise<ProjectEntity[]> {
        let response = await this.getProjectsUsecaseProxy.getInstance().execute(query);
        response = response.map((p) => plainToClass(ProjectPresenter, p));
        return response;
    }

    @Permissions(EndPoint.PROJECT_GET)
    @Get(':id')
    async get(@Param('id') id: string): Promise<ProjectPresenter> {
        let response = await this.projectRepository.findById(+id);
        response = plainToClass(ProjectPresenter, response);
        return response;
    }

    @Post()
    async create(@Body() createProjectPresenter: CreateProjectPresenter): Promise<ProjectPresenter> {
        const project = plainToClass(ProjectEntity, createProjectPresenter);
        const projectEntity = await this.createProjectsUsecaseProxy.getInstance().execute(project);
        const projectPresenter = plainToClass(ProjectPresenter, projectEntity);
        const workloads = generateWorkload(createProjectPresenter.weekInCurrentMonth, null, null, 0, '', projectPresenter.id);
        const user = plainToClass(UserEntity, { workloads: workloads });
        projectPresenter.users.push(user);
        return projectPresenter;
    }

    @Post('add-member')
    async addMember(@Body() userProjectPresenter: UserProjectPresenter): Promise<UserPresenter[]> {
        const addMemberEntity = plainToClass(AddMemberEntity, userProjectPresenter);
        const useEntity = await this.addMemberUsecaseProxy.getInstance().execute(addMemberEntity);
        const response = plainToClass(UserPresenter, useEntity);
        return response;
    }
}
