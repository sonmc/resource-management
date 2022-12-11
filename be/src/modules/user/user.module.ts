import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    providers: [UserService],
    controllers: [UserController],
    exports: [TypeOrmModule, UserService],
    imports: [ConfigModule, TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
})
export class UserModule {}
