import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { compare, hash } from 'src/infrastructure/services/bcrypt.service';

export class ChangePasswordUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

    async execute(user_id: number, old_password: string, new_password: string): Promise<string> {
        let result = '';
        const user = await this.userRepository.findOne(user_id);
        const isMatched = await compare(old_password, user.password);
        if (isMatched) {
            user.password = await hash(new_password);
            await this.userRepository.createOrUpdate(user);
            result = 'updated';
        } else {
            result = 'unmatched';
        }
        this.logger.log('changePasswordUseCases execute', 'New password have been updated');
        return result;
    }
}
