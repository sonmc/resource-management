import { User } from '../../infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../../infrastructure/schemas/todo.entity';
import { ProjectRepository } from './project.repository';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Todo]), TypeOrmModule.forFeature([User])],
    providers: [ProjectRepository, UserRepository],
    exports: [ProjectRepository, UserRepository],
})
export class RepositoriesModule {}
