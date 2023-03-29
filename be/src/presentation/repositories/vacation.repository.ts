import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IVacationRepository } from 'src/domain/repositories/vacation-repository.interface';
import { VacationEntity } from 'src/domain/entities/vacation.entity';
import { Vacation } from 'src/infrastructure/schemas/vacation.schema';

@Injectable()
export class VacationRepository implements IVacationRepository {
    constructor(
        @InjectRepository(Vacation)
        private readonly repository: Repository<Vacation>
    ) {}

    async create(vacationE: VacationEntity): Promise<VacationEntity> {
        const vacation = plainToClass(Vacation, vacationE);
        const result = await this.repository.create(vacation);
        await this.repository.save(result);
        return plainToClass(VacationEntity, result);
    }

    async findAll(filter: any): Promise<any> {
        return [];
    }
}
