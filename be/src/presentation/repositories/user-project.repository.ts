import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectEntity } from 'src/domain/entities/user-project.entity';
import { IUserProjectRepository } from 'src/domain/repositories/user-roject.repository.interface';
import { UserProject } from 'src/infrastructure/schemas/user_project.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UserProjectRepository implements IUserProjectRepository {
    constructor(
        @InjectRepository(UserProject)
        private readonly repository: Repository<UserProject>
    ) {}
    findAll(): Promise<UserProjectEntity[]> {
        throw new Error('Method not implemented.');
    }
    create(userProject: UserProjectEntity): Promise<UserProjectEntity> {
        throw new Error('Method not implemented.');
    }
}
