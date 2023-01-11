import { User } from '../schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../schemas/todo.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Todo]), TypeOrmModule.forFeature([User])],
    providers: [DatabaseTodoRepository, DatabaseUserRepository],
    exports: [DatabaseTodoRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
