import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
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

    async findAll(): Promise<UserProjectEntity[]> {
        throw new Error('Method not implemented.');
    }
    async create(userProject: UserProjectEntity): Promise<UserProjectEntity> {
        const userProjectSchema = plainToClass(UserProject, userProject);
        const result = await this.repository.create(userProjectSchema);
        await this.repository.save(result);
        const userProjectE = plainToClass(UserProjectEntity, result);
        return userProjectE;
    }
}
