import { User } from '../../infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../infrastructure/schemas/project.schema';
import { ProjectRepository } from './project.repository';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';
import { RoleRepository } from './role.repository';
import { Role } from 'src/infrastructure/schemas/role.schema';
import { Workload } from 'src/infrastructure/schemas/workload.schema';
import { UserProject } from 'src/infrastructure/schemas/user_project.schema';
import { WorkloadRepository } from './workload.repository';
import { UserProjectRepository } from './user-project.repository';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role]), TypeOrmModule.forFeature([Workload]), TypeOrmModule.forFeature([UserProject])],
    providers: [ProjectRepository, UserRepository, RoleRepository, UserProjectRepository, WorkloadRepository],
    exports: [ProjectRepository, UserRepository, RoleRepository, UserProjectRepository, WorkloadRepository],
})
export class RepositoriesModule {}
