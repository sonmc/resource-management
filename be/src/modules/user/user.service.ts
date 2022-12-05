import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  getUserByEmail(email: string): Promise<User> {
    var user = this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    var users = await this.userRepository.find();
    return users;
  }

  async create(user: User): Promise<User> {
    var u = await this.userRepository.create(user);
    return u;
  }
}
