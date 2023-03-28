import { VacationEntity } from '../entities/vacation.entity';

export interface IVacationRepository {
    create(role: VacationEntity): Promise<VacationEntity>;
    findAll(filter, paging): Promise<VacationEntity[]>;
}