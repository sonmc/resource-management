import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { ICandidateRepository } from 'src/domain/repositories/candidate.repository.interface';
import { Candidate } from 'src/infrastructure/schemas/candidate.schema';

export class GetCandidateUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly candidateRepository: ICandidateRepository) {}

    async execute(id: number): Promise<Candidate> {
        return await this.candidateRepository.findOne(id);
    }
}
