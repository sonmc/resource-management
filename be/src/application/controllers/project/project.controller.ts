import { Controller, Get, Inject } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { GetProjectsUseCases } from "src/usecases/project/getProjects.usecases";
import { UseGuards } from "@nestjs/common/decorators";
import { JwtStrategy } from "src/infrastructure/common/strategies/jwt.strategy";
import { ProjectPresenter } from "./dto/project.presenter";

@Controller("projects")
@ApiTags("projects")
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: "Internal error" })
export class ProjectController {
  constructor(
    @Inject(UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY)
    private readonly getProjectsUsecaseProxy: UseCaseProxy<GetProjectsUseCases>
  ) {}

  @Get()
  async get() {
    const projects = await this.getProjectsUsecaseProxy.getInstance().execute();
    return projects.map((p) => new ProjectPresenter(p));
  }
}
