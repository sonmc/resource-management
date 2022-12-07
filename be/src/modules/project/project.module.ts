import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [TypeOrmModule, ProjectService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Project])],
})
export class ProjectModule {}
