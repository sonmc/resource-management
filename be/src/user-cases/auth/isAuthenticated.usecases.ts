import { UserModel, UserWithoutPassword } from '../../domain/model/user.model';
import { UserRepository } from '../../domain/repositories/user-repository.interface';

export class IsAuthenticatedUseCases {
    constructor(private readonly adminUserRepo: UserRepository) {}

    async execute(username: string): Promise<UserWithoutPassword> {
        const user: UserModel = await this.adminUserRepo.getUserByUsername(username);
        const { password, ...info } = user;
        return info;
    }
}
