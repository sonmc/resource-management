import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { INewRepository } from 'src/domain/repositories/new-repository.interface';
import { New } from 'src/infrastructure/schemas/new.schema';
import { NewEntity } from 'src/domain/entities/new.entity';
import { User } from 'src/infrastructure/schemas/user.schema';

@Injectable()
export class NewRepository implements INewRepository {
    constructor(
        @InjectRepository(New)
        private readonly repository: Repository<New>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(newE: NewEntity): Promise<NewEntity> {
        const newSchema = plainToClass(New, newE);
        const response = await this.repository.create(newSchema);
        return plainToClass(NewEntity, response);
    }

    async findAll(): Promise<NewEntity[]> {
        let findOption: FindManyOptions = {
            relations: ['user'],
            order: {
                created_at: 'DESC',
            },
        };
        let news = await this.repository.find(findOption as FindManyOptions);
        return news.map((n) => plainToClass(NewEntity, n));
    }
}
