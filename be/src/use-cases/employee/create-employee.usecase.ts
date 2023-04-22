import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository.interface';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';
import { GenerateLunchCalendars } from 'src/business-rules/lunch-order.rule';

export class CreateEmployeeUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly lunchOrderRepository: ILunchOrderRepository) {}

    update(user) {
        let userSchema = new UserEntity();
        userSchema.first_name = user.first_name;
        userSchema.last_name = user.last_name;
        userSchema.email = user.email;
        userSchema.phone_number = user.phone_number;
        userSchema.nick_name = user.nick_name;
        userSchema.introduce = user.introduce;
        userSchema.address = user.address;
        userSchema.password = user.password;
        userSchema.avatar = user.avatar;
        return userSchema;
    }

    async execute(userE: UserEntity): Promise<UserEntity> {
        let newUserEntity = userE;
        if (userE.id) {
            const currentUser = await this.userRepository.findOne(userE.id);
            newUserEntity = this.update(currentUser);
        }
        const user = await this.userRepository.createOrUpdate(newUserEntity);

        const lunchOrder = new LunchOrderEntity();
        lunchOrder.user = user;
        if (!userE.id) {
            lunchOrder.lunch_calendars = GenerateLunchCalendars(user.onboarding);
            await this.lunchOrderRepository.createOrUpdate(lunchOrder);
        }
        this.logger.log('createEmployeeUseCases execute', 'New employee have been inserted');
        return user;
    }
}
