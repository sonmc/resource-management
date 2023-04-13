import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository';
import { ILogger } from '../../domain/logger/logger.interface';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';

export class AddLunchOrderUseCases {
    constructor(private readonly logger: ILogger, private readonly lunchOrderRepository: ILunchOrderRepository) {}

    async execute(user_id: number): Promise<LunchOrderEntity> {
        const lunchOrderCreated = await this.lunchOrderRepository.createOrUpdate(user_id);
        this.logger.log('createLunchOrderUseCases execute', 'New lunch order have been inserted for employee');
        return lunchOrderCreated;
    }
}
