import { Role } from './../role/entities/role.entity';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
@Module({
    providers: [ProjectService, UserService],
    controllers: [ProjectController],
    exports: [TypeOrmModule, ProjectService],
    imports: [ConfigModule, TypeOrmModule.forFeature([Project]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
})
export class ProjectModule {}
