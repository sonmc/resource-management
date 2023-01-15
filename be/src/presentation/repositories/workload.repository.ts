import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWorkloadRepository } from 'src/domain/repositories/workload-repository.interface';
import { WorkloadEntity } from 'src/domain/entities/workload.entity';
import { Workload } from 'src/infrastructure/schemas/workload.schema';

@Injectable()
export class WorkloadRepository implements IWorkloadRepository {
    constructor(
        @InjectRepository(Workload)
        private readonly repository: Repository<Workload>
    ) {}

    async findAll(): Promise<WorkloadEntity[]> {
        const workloads = await this.repository.find();
        return workloads.map((w) => new WorkloadEntity(w));
    }

    async create(workload: WorkloadEntity): Promise<WorkloadEntity> {
        throw new Error('Method not implemented.');
    }

    async save(): Promise<WorkloadEntity> {
        throw new Error('Method not implemented.');
    }
}
