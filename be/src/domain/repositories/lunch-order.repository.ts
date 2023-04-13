import { LunchOrderEntity } from '../entities/lunch-order.entity';

export interface ILunchOrderRepository {
    createOrUpdate(user_id: number): Promise<LunchOrderEntity>;
    findAll(): Promise<LunchOrderEntity[]>;
}
