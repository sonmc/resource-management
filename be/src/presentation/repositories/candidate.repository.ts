import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, MoreThan } from 'typeorm';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ICandidateRepository } from 'src/domain/repositories/candidate.repository.interface';
import { Candidate } from 'src/infrastructure/schemas/candidate.schema';

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Candidate)
        private readonly candidateRepository: Repository<Candidate>
    ) {}
    findOne(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findAll(param: any): Promise<any> {
        const candidates = this.candidateRepository.find();
        return candidates;
    }

    async createOrUpdate(file: any): Promise<any> {
        console.log(file);
    }
}
