import { ILogger } from "src/domain/logger/logger.interface";
import { RoleModel } from "src/domain/model/role";
import { IRoleRepository } from "src/domain/repositories/roleRepository.interface";

export class GetRolesUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly roleRepository: IRoleRepository
  ) {}

  async execute(): Promise<RoleModel[]> {
    return await this.roleRepository.findAll();
  }
}
