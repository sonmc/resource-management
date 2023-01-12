import { User } from '../../infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../infrastructure/schemas/project.schema';
import { ProjectRepository } from './project.repository';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([User])],
    providers: [ProjectRepository, UserRepository],
    exports: [ProjectRepository, UserRepository],
})
export class RepositoriesModule {}
