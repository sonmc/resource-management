import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findById(userId: number): Promise<User> {
    const product = await this.userRepository.findOne(userId);
    if (!product) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return product;
  }
  public async findByMail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
