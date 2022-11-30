import { Repository, EntityRepository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Project } from "./entities/project.entity";

@Injectable()
@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async findAll(): Promise<Project[]> {
    return await this.find({});
  }

  public async findById(userId: number): Promise<Project> {
    return await this.findOne(userId);
  }

  public async destroy(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    await this.remove(user);
  }
}
