import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../schemas/user.schema';
import { DatabaseUserRepository } from './user.repository';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User])],
    providers: [DatabaseUserRepository],
    exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
