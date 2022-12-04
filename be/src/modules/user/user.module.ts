import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [ConfigModule, TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
