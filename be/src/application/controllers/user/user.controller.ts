import { Controller, Get, Inject } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { GetEmployeesUseCases } from "src/usecases/employee/getEmployees.usecases";
import { UseGuards } from "@nestjs/common/decorators";
import { JwtStrategy } from "src/infrastructure/common/strategies/jwt.strategy";

@Controller("users")
@ApiTags("users")
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: "Internal error" })
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_EMPLOYEES_USECASES_PROXY)
    private readonly getUsersUsecaseProxy: UseCaseProxy<GetEmployeesUseCases>
  ) {}

  @Get()
  async get() {
    const users = await this.getUsersUsecaseProxy.getInstance().execute();
    return users;
  }
}
