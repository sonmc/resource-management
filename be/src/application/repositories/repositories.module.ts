import { User } from "../../infrastructure/schemas/user.schema";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "../../infrastructure/schemas/project.schema";
import { ProjectRepository } from "./project.repository";
import { UserRepository } from "./user.repository";
import { ConfigModule } from "@nestjs/config";
import { RoleRepository } from "./role.repository";
import { Role } from "src/infrastructure/schemas/role.schema";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [ProjectRepository, UserRepository, RoleRepository],
  exports: [ProjectRepository, UserRepository, RoleRepository],
})
export class RepositoriesModule {}
