import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'src/infrastructure/schemas/permission.schema';
import { plainToClass } from 'class-transformer';
import { INewRepository } from 'src/domain/repositories/new-repository.interface';
import { New } from 'src/infrastructure/schemas/new.schema';
import { NewEntity } from 'src/domain/entities/new.entity';

@Injectable()
export class NewRepository implements INewRepository {
    constructor(
        @InjectRepository(New)
        private readonly repository: Repository<Permission>
    ) {}

    async create(newE: NewEntity): Promise<NewEntity> {
        const response = await this.repository.create(newE);
        return plainToClass(NewEntity, response);
    }

    async findAll(): Promise<NewEntity[]> {
        const datas = await this.repository.find();
        const news = await datas.map((r) => plainToClass(NewEntity, r));
        return news;
    }
}
