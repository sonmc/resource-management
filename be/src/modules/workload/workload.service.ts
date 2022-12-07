import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workload } from "./entities/workload.entity";

@Injectable()
export class WorkloadService {
  constructor(
    @InjectRepository(Workload) private workloadRepository: Repository<Workload>
  ) {}

  findAll() {
    return `This action returns all workload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workload`;
  }

  remove(id: number) {
    return `This action removes a #${id} workload`;
  }
}
