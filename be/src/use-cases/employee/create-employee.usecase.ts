import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository.interface';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';
import { GenerateLunchCalendars } from 'src/business-rules/lunch-order.rule';

export class CreateEmployeeUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly lunchOrderRepository: ILunchOrderRepository) {}

    update(currentUser, user) {
        currentUser.first_name = user.first_name;
        currentUser.last_name = user.last_name;
        currentUser.email = user.email;
        currentUser.username = user.username;
        currentUser.phone_number = user.phone_number;
        currentUser.nick_name = user.nick_name;
        currentUser.introduce = user.introduce;
        currentUser.address = user.address;
        currentUser.password = user.password;
        currentUser.avatar = user.avatar;
        currentUser.nick_name = user.nick_name;
        currentUser.status = user.status;
        currentUser.gender = user.gender;
        currentUser.dob = user.dob;
        return currentUser;
    }

    async execute(userE: UserEntity): Promise<UserEntity> {
        let newUserEntity = userE;
        if (userE.id) {
            const currentUser = await this.userRepository.findOne(userE.id);
            newUserEntity = this.update(currentUser, userE);
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
