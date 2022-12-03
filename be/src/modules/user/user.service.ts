import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository
  ) {}

  async findAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<User[]> {
    return await this.usersRepository.getAllEntity(relations, throwsException);
  }

  async create(inputs: CreateUserDto): Promise<User> {
    return await this.usersRepository.createEntity(inputs);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<User> {
    return await this.usersRepository.getEntityById(
      id,
      relations,
      throwsException
    );
  }

  async findUserAndMessageReadById(
    id: number,
    status: number | null
  ): Promise<User> {
    return await this.usersRepository.findUserAndMessageReadById(id, status);
  }

  async deleteById(id: number): Promise<boolean> {
    return await this.usersRepository.deleteEntityById(id);
  }

  async geUsersByEmail(email: string): Promise<User[]> {
    return await this.usersRepository.getUsersByEmail(email);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.getUserByEmail(email);
  }
}
