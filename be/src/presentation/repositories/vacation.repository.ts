import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IVacationRepository } from 'src/domain/repositories/vacation-repository.interface';
import { VacationEntity } from 'src/domain/entities/vacation.entity';
import { Vacation } from 'src/infrastructure/schemas/vacation.schema';
import { User } from 'src/infrastructure/schemas/user.schema';

@Injectable()
export class VacationRepository implements IVacationRepository {
    constructor(
        @InjectRepository(Vacation)
        private readonly repository: Repository<Vacation>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(vacationE: VacationEntity): Promise<VacationEntity> {
        const vacation = plainToClass(Vacation, vacationE);
        vacation.user = await this.userRepository.findOne(vacationE.user_id);
        const result = await this.repository.create(vacation);
        await this.repository.save(result);
        return plainToClass(VacationEntity, result);
    }

    async findAll(filter: any): Promise<any> {
        return [];
    }
}
