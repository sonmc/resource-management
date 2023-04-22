import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThan } from 'typeorm';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ICandidateRepository } from 'src/domain/repositories/candidate.repository.interface';
import { Candidate } from 'src/infrastructure/schemas/candidate.schema';
import { handleSearchText } from 'src/actions/candidate.action';

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Candidate)
        private readonly repository: Repository<Candidate>
    ) {}
    findOne(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findAll(param: any): Promise<any> {
        const query = this.repository.createQueryBuilder('can');
        query.where('1 = :id', { id: 1 });
        let candidates = null;
        const { phone, email, name } = handleSearchText(param.searchTerm);
        if (param.status != -1) {
            query.andWhere('can.isInterview = :status', { status: param.status });
        }
        if (param.searchTerm) {
            if (name) {
                query.andWhere('can.name like :name', { name: `%${name}%` });
            } else if (phone) {
                query.andWhere('can.phone_number like :phone', { phone: `%${phone}%` });
            } else if (email) {
                query.andWhere('can.email like :email', { email: `%${email}%` });
            }
        }
        candidates = await query.getMany();

        return candidates;
    }

    async createOrUpdate(candidate: Candidate): Promise<Candidate> {
        const response = await this.repository.create(candidate);
        const result = await this.repository.save(response);
        return result;
    }
}
