import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindManyOptions, Not, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { LunchOrder } from 'src/infrastructure/schemas/lunch_order.schema';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';
import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository.interface';
import { ADMIN_ID, STATUS_ACTIVE } from 'src/business-rules/employee.rule';

@Injectable()
export class LunchOrderRepository implements ILunchOrderRepository {
    constructor(
        @InjectRepository(LunchOrder)
        private readonly repository: Repository<LunchOrder>
    ) {}

    async deleteByUserId(user_id: number): Promise<void> {
        const lunchOrder = await this.repository.createQueryBuilder('lunchOrder').where('lunchOrder.userId = :user_id', { user_id: user_id }).getOne();
        await this.repository.delete(lunchOrder.id);
    }

    async createOrUpdate(lunchOrderEntity: LunchOrderEntity): Promise<LunchOrderEntity> {
        const lunchOrder = plainToClass(LunchOrder, lunchOrderEntity);
        const response = await this.repository.create(lunchOrder);
        await this.repository.save(response);
        return plainToClass(LunchOrderEntity, response);
    }

    async findAll(): Promise<LunchOrderEntity[]> {
        let findOption: FindManyOptions = {
            relations: ['user'],
            where: { id: Not(Equal(ADMIN_ID)) },
        };
        let news = await this.repository.find(findOption as FindManyOptions);
        news = news.filter((x) => x.user.status == STATUS_ACTIVE);
        return news.map((n) => plainToClass(LunchOrderEntity, n));
    }
}
