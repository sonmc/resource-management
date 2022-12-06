import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Role } from "./entities/role.entity";

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  exports: [TypeOrmModule, RoleService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
