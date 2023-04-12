import { NewEntity } from '../entities/new.entity';

export interface INewRepository {
    create(project: NewEntity): Promise<NewEntity>;
    findAll(): Promise<NewEntity[]>;
}
