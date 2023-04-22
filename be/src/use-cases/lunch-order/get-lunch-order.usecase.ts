import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';

export class GetLunchOrderUseCases {
    constructor(private readonly logger: ILogger, private readonly lunchOrderRepository: ILunchOrderRepository) {}

    async execute(): Promise<LunchOrderEntity[]> {
        const lunchOrders = await this.lunchOrderRepository.findAll();
        this.logger.log('createLunchOrderUseCases execute', 'New lunch order have been inserted for employee');
        return lunchOrders;
    }
}
