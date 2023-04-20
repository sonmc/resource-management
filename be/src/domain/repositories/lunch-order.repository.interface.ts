import { LunchOrderEntity } from '../entities/lunch-order.entity';

export interface ILunchOrderRepository {
    createOrUpdate(lunchOrder: LunchOrderEntity): Promise<LunchOrderEntity>;
    findAll(): Promise<LunchOrderEntity[]>;
    deleteByUserId(user_id: number): Promise<void>;
}