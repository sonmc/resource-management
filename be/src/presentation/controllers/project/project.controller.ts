import { CacheInterceptor, CacheTTL, Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetProjectsUseCases } from 'src/use-cases/project/get-projects.usecases';
import { Body, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';
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
import { PagingDataDto } from 'src/domain/dto/paging.dto';

@UseInterceptors(CacheInterceptor)
@Controller('projects')
@ApiTags('projects')
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class ProjectController {
  constructor(
    @Inject(UseCasesProxyModule.GET_PROJECTS_USECASES_PROXY)
    private readonly getProjectsUsecaseProxy: UseCaseProxy<GetProjectsUseCases>,
    @Inject(UseCasesProxyModule.CREATE_PROJECT_USECASES_PROXY)
    private readonly createProjectsUsecaseProxy: UseCaseProxy<CreateProjectUseCases>,
    @Inject(UseCasesProxyModule.ADD_MEMBER_USECASES_PROXY)
    private readonly addMemberUsecaseProxy: UseCaseProxy<AddMemberUseCases>
  ) {}

  @CacheTTL(10)
  @Get()
  async getAll(@Query() query): Promise<PagingDataDto> {
    const { cursor, limit } = query;
    let response = await this.getProjectsUsecaseProxy.getInstance().execute(limit, cursor);
    response = response.datas.map((p) => plainToClass(ProjectPresenter, p));
    return response;
  }

  @Post()
  async create(@Body() createProjectPresenter: CreateProjectPresenter): Promise<ProjectPresenter> {
    const project = plainToClass(ProjectEntity, createProjectPresenter);
    const projectEntity = await this.createProjectsUsecaseProxy.getInstance().execute(project);
    const projectPresenter = plainToClass(ProjectPresenter, projectEntity);
    const workloads = generateWorkload(0, '', projectPresenter.id);
    const user = plainToClass(UserEntity, { workloads: workloads });
    projectPresenter.users.push(user);
    return projectPresenter;
  }

  @Post('add-member')
  async addMember(@Body() userProjectPresenter: UserProjectPresenter): Promise<UserPresenter> {
    const addMemberEntity = plainToClass(AddMemberEntity, userProjectPresenter);
    const useEntity = await this.addMemberUsecaseProxy.getInstance().execute(addMemberEntity);
    const response = plainToClass(UserPresenter, useEntity);
    return response;
  }
}
