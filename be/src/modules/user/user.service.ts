import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Role) private roleRepository: Repository<Role>) { }

    async getUserByEmail(email: string): Promise<User> {
        var user = await this.userRepository.findOne({
            where: { email },
        });
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async create(userDto: CreateUserDto): Promise<User> {
        // const userConverted = Object.assign(new User(), userDto);
        const data = await this.userRepository.findOne(1);
        data.email = userDto.email;
        data.name = userDto.name;
        data.phoneNumber = userDto.phoneNumber;
        data.role = await this.roleRepository.findOne(userDto.roleId);
        data.id = 0;
        var user = await this.userRepository.create(data);
        await this.userRepository.save(user);
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
