import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository.interface';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';
import { GenerateLunchCalendars } from 'src/business-rules/lunch-order.rule';

export class CreateEmployeeUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly lunchOrderRepository: ILunchOrderRepository) {}

    async execute(userE: UserEntity): Promise<UserEntity> {
        const user = await this.userRepository.createOrUpdate(userE);

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
