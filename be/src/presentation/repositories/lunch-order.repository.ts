import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { LunchOrder } from 'src/infrastructure/schemas/lunch_order.schema';
import { LunchOrderEntity } from 'src/domain/entities/lunch-order.entity';
import { ILunchOrderRepository } from 'src/domain/repositories/lunch-order.repository';
import { User } from 'src/infrastructure/schemas/user.schema';
 

@Injectable()
export class LunchOrderRepository implements ILunchOrderRepository {
    constructor(
        @InjectRepository(LunchOrder)
        private readonly repository: Repository<LunchOrder>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createOrUpdate(user_id: number): Promise<LunchOrderEntity> {
        const lunchOrder = new LunchOrder();
        lunchOrder.user_id = user_id;
        const user = await this.userRepository.findOne(user_id);
        lunchOrder.user = user;
        lunchOrder.lunch_calendars = "";
        const response = await this.repository.create(lunchOrder);
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
