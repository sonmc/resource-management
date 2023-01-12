import { ILogger } from "src/domain/logger/logger.interface";

import { RoleModel } from "src/domain/model/role";
import { IRoleRepository } from "../../domain/repositories/roleRepository.interface";

export class GetRoleUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly roleRepository: IRoleRepository
  ) {}

  async execute(id: number): Promise<RoleModel> {
    return await this.roleRepository.findById(id);
  }
}
