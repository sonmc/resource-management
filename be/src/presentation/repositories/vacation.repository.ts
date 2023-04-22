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

    async changeStatus(vacation_id: number, status: number): Promise<boolean> {
        const vacation = await this.repository.findOne(vacation_id);
        vacation.status = status;
        const result = await this.repository.create(vacation);
        const res = await this.repository.save(result);
        return res != null;
    }

    async create(vacationE: VacationEntity): Promise<VacationEntity> {
        const vacation = plainToClass(Vacation, vacationE);
        vacation.user = await this.userRepository.findOne(vacationE.user_id);
        const result = await this.repository.create(vacation);
        await this.repository.save(result);
        return plainToClass(VacationEntity, result);
    }

    async findAll(filter: any): Promise<VacationEntity[]> {
        const query = this.repository.createQueryBuilder('vacation').innerJoinAndSelect('vacation.user', 'user');

        if (filter.status > 0) {
            query.andWhere('vacation.status = :status', { status: filter.status });
        }
        if (filter.searchTerm) {
            query.andWhere('user.first_name like :name', { name: `%${filter.searchTerm}%` });
            query.andWhere('user.last_name like :name', { name: `%${filter.searchTerm}%` });
        }

        const vacations = await query.getMany().then((u) =>
            u.map((x) => {
                return plainToClass(VacationEntity, x);
            })
        );
        return vacations;
    }
}
