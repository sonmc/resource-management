import { UserWithoutPassword } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class GetOneUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<UserWithoutPassword> {
    return await this.userRepository.findOne(id);
  }
}