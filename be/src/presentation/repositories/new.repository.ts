import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { INewRepository } from 'src/domain/repositories/new-repository.interface';
import { New } from 'src/infrastructure/schemas/new.schema';
import { NewEntity } from 'src/domain/entities/new.entity';
import { User } from 'src/infrastructure/schemas/user.schema';
import { convertToShortText } from 'src/actions/common';

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
        newSchema.user = await this.userRepository.findOne(newE.user_id);
        const response = await this.repository.create(newSchema);
        await this.repository.save(response);
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
        return news.map((n) => plainToClass(NewEntity, { ...n, short_des: convertToShortText(n.content) }));
    }
}
