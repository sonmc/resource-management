import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRegisterRequestDto } from "./dto/user-register.req.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async doUserRegistration(
    userRegister: UserRegisterRequestDto
  ): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;

    return await user.save();
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findOne(userId: number): Promise<User> {
    const product = await this.userRepository.findById(userId);
    if (!product) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return product;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.createUser(createUserDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const product = await this.userRepository.findOne(userId);
    if (!product) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.editUser(userId, updateUserDto);
  }

  async getUserByEmail(email: string): Promise<UserDto[]> {
    return await this.userRepository.getUsersByEmail(email);
  }

  public async remove(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async geUsersByEmail(email: string): Promise<UserDto[]> {
    return await this.userRepository.getUsersByEmail(email);
  }

  async findById(
    id: number,
    relations: string[] = [],
    throwsException = false
  ): Promise<UserDto> {
    return await this.userRepository.getEntityById(
      id,
      relations,
      throwsException
    );
  }
}
