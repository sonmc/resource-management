import { classToPlain, plainToClass } from "class-transformer";
import { EntityRepository } from "typeorm";

import { NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CommonRepository } from "../common/common.repository";

@EntityRepository(User)
export class UserRepository extends CommonRepository<User, User> {
  async getUsersByEmail(email: string): Promise<User[]> {
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

  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: { email: email },
    }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException("Model not found"));
      }

      return Promise.resolve(entity ? this.transform(entity) : null);
    });
  }

  async findUserAndMessageReadById(
    id: number,
    status: number | null
  ): Promise<any> {
    return await this.createQueryBuilder("user")
      .leftJoinAndSelect("user.messages", "messages")
      .where("messages.status = :status", { status })
      .andWhere({ id })
      .getOne();
  }

  async findAllConversation(
    user_id: number | string
  ): Promise<User | User | null> {
    return await this.createQueryBuilder("users")
      .innerJoinAndSelect("users.conversations", "conversations")
      .leftJoinAndSelect("conversations.users", "usersInConversation")
      .innerJoinAndMapOne(
        "conversations.messages",
        "conversations.messages",
        "messages",
        "messages.conversation_id = conversations.id"
      )
      .select([
        "users",
        "conversations",
        "usersInConversation",
        "userConversation.last_message_id",
        "messages",
      ])
      .innerJoinAndMapOne(
        "usersInConversation.last_message_id",
        "usersInConversation.userConversation",
        "userConversation",
        "userConversation.conversation_id = conversations.id"
      )
      .where("users.id = :id", { id: user_id })
      .orderBy("messages.id", "DESC")
      .getOne()
      .then((entity) => {
        if (!entity) {
          return Promise.reject(new NotFoundException("Model not found"));
        }
        return Promise.resolve(entity ? this.transform(entity) : null);
      });
  }

  transform(model: User): User {
    const transformOptions = {};

    return plainToClass(
      User,
      classToPlain(model, transformOptions),
      transformOptions
    );
  }

  transformMany(models: User[]): User[] {
    return models.map((model) => this.transform(model));
  }
}
