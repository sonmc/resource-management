import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Role) private roleRepository: Repository<Role>) {}

    async getUserByEmail(email: string): Promise<User> {
        var user = await this.userRepository.findOne({
            where: { email },
        });
        return user;
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            console.log(error);
        }
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            userDto.role = await this.roleRepository.findOne(+userDto.role_id);
            var user = await this.userRepository.create(userDto);
            await user.setPassword('123456');
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
        }
        return user;
    }

    async findOne(id: number) {
        return await this.userRepository.findOne(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne(id);
        const userTransformed = Object.assign(user, updateUserDto);
        return await this.userRepository.save(userTransformed);
    }
}
