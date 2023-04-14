import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { LunchOrder } from 'src/infrastructure/schemas/lunch_order.schema';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';
import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository';

@Injectable()
export class LunchOrderRepository implements ILunchOrderRepository {
    constructor(
        @InjectRepository(LunchOrder)
        private readonly repository: Repository<LunchOrder>
    ) {}

    async createOrUpdate(lunchOrderEntity: LunchOrderEntity): Promise<LunchOrderEntity> {
        const lunchOrder = plainToClass(LunchOrder, lunchOrderEntity);
        const response = await this.repository.create(lunchOrder);
        await this.repository.save(response);
        return plainToClass(LunchOrderEntity, response);
    }

    async findAll(): Promise<LunchOrderEntity[]> {
        let findOption: FindManyOptions = {
            relations: ['user'],
        };
        let news = await this.repository.find(findOption as FindManyOptions);
        return news.map((n) => plainToClass(LunchOrderEntity, n));
    }
}
