import { UserModel } from "src/domain/model/user";
import { IUserRepository } from "src/domain/repositories/userRepository.interface";
import { ILogger } from "../../domain/logger/logger.interface";

export class GetEmployeesUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }
}
