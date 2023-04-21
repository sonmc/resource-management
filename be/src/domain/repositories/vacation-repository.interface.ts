import { VacationEntity } from '../entities/vacation.entity';

export interface IVacationRepository {
    create(role: VacationEntity): Promise<VacationEntity>;
    findAll(filter): Promise<VacationEntity[]>;
    changeStatus(vacation_id: number, status: number): Promise<boolean>;
}
