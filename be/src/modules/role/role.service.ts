import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);
    return role;
  }

  async findAll() {
    return await this.roleRepository
      .createQueryBuilder()
      .select("roles.id")
      .addOrderBy("roles.id")
      .addSelect("roles.name")
      .from(Role, "roles")
      .where("roles.id > :id", { id: 1 })
      .getMany();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne(id);
    const roleTrans = Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(roleTrans);
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne(id);
    await this.roleRepository.delete(role);
    return role;
  }
}
