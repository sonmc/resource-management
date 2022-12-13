import { User } from 'src/modules/user/entities/user.entity';
import { UserProject } from "./../user_project/entities/user_project.entity";
import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ConfigModule } from "@nestjs/config";
import { Role } from "../role/entities/role.entity";
import { Workload } from "../workload/entities/workload.entity";
@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [TypeOrmModule, ProjectService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([UserProject]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Workload]),
    TypeOrmModule.forFeature([User]),
  ],
})
export class ProjectModule { }
