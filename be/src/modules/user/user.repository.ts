import { classToPlain, plainToClass } from "class-transformer";
import { Repository, EntityRepository } from "typeorm";

import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";


@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findAll(): Promise<User[]> {
    return await this.find({});
  }

  public async findById(userId: number): Promise<User> {
    return await this.findOne(userId);
  }

  public async destroy(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    await this.remove(user);
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    await this.save(user);
    return user;
  }

  public async editUser(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const user = await this.findOne(userId);

    await this.save(user);
    return user;
  }

  async getUsersByEmail(email: string): Promise<UserDto[]> {
    return this.find({
      where: {
        email: email,
      },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException("Model not found"));
      }

      return Promise.resolve(entity ? this.transformMany(entity) : null);
    });
  }

  transform(model: User): UserDto {
    const transformOptions = {};
    return plainToClass(
      UserDto,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }

  transformMany(models: User[]): UserDto[] {
    return models.map((model) => this.transform(model));
  }

  async getEntityById(
    id: string | number,
    relations: string[] = [],
    throwsException = false
  ): Promise<UserDto> {
    return await this.findOne({
      where: { id },
      relations,
    }).then((entity) => {
      if (!entity && throwsException) {
        return Promise.reject(new NotFoundException("Model not found"));
      }

      return Promise.resolve(entity ? this.transform(entity) : null);
    });
  }
}
