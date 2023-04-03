import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWorkloadRepository } from 'src/domain/repositories/workload-repository.interface';
import { WorkloadEntity } from 'src/domain/entities/workload.entity';
import { Workload } from 'src/infrastructure/schemas/workload.schema';
import { plainToClass } from 'class-transformer';

@Injectable()
export class WorkloadRepository implements IWorkloadRepository {
    constructor(
        @InjectRepository(Workload)
        private readonly repository: Repository<Workload>
    ) {}

    async findByProjectIdUserId(project_id: any, user_id: any): Promise<WorkloadEntity[]> {
        const workloads = await this.repository.find({
            where: {
                project_id: project_id,
                user_id: user_id,
            },
        });
        const result = workloads.map((w) => plainToClass(WorkloadEntity, w));
        return result;
    }

    async findAll(): Promise<WorkloadEntity[]> {
        const workloads = await this.repository.find();
        return workloads.map((w) => plainToClass(WorkloadEntity, w));
    }

    async create(workload: WorkloadEntity): Promise<WorkloadEntity> {
        const workloadSchema = plainToClass(Workload, workload);
        const result = await this.repository.create(workloadSchema);
        await this.repository.save(result);
        const workloadE = plainToClass(WorkloadEntity, result);
        return workloadE;
    }
}
