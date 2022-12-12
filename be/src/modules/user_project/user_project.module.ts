import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProject } from "./entities/user_project.entity";

@Module({
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
  imports: [ConfigModule, TypeOrmModule.forFeature([UserProject])],
})
export class UserProjectModule {}
