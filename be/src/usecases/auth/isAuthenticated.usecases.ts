import { UserEntity, UserWithoutPassword } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';

export class IsAuthenticatedUseCases {
    constructor(private readonly userService: IUserRepository) {}

    async execute(username: string): Promise<UserWithoutPassword> {
        const user: UserEntity = await this.userService.getUserByUsername(username);
        const { password, ...info } = user;
        return info;
    }
}
