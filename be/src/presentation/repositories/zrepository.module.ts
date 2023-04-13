import { RolePermRepository } from 'src/presentation/repositories/role-perm.repository';
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
import { PermissionRepository } from './permission.repository';
import { Permission } from 'src/infrastructure/schemas/permission.schema';
import { UserRole } from 'src/infrastructure/schemas/user-role.schema';
import { VacationRepository } from './vacation.repository';
import { Vacation } from 'src/infrastructure/schemas/vacation.schema';
import { RolePem } from 'src/infrastructure/schemas/role-pems.schema';
import { NewRepository } from './new.repository';
import { New } from 'src/infrastructure/schemas/new.schema';
import { LunchOrderRepository } from './lunch-order.repository';
import { LunchOrder } from 'src/infrastructure/schemas/lunch_order.schema';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Project, User, Workload, Role, UserProject, Permission, UserRole, Vacation, RolePem, New, LunchOrder])],
    providers: [ProjectRepository, UserRepository, RoleRepository, UserProjectRepository, WorkloadRepository, PermissionRepository, VacationRepository, RolePermRepository, NewRepository, LunchOrderRepository],
    exports: [ProjectRepository, UserRepository, RoleRepository, UserProjectRepository, WorkloadRepository, PermissionRepository, VacationRepository, RolePermRepository, NewRepository, LunchOrderRepository],
})
export class RepositoriesModule {}
