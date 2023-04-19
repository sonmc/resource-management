import { CreateCandidateUseCases } from 'src/use-cases/candidate/create-candidate.usecase';
import { LoggerService } from '../logger/logger.service';
import { UserRepository } from 'src/presentation/repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { CandidateRepository } from 'src/presentation/repositories/candidate.repository';
import { GetCandidatesUseCases } from 'src/use-cases/candidate/get-all.usecases';
import { GetCandidateUseCases } from 'src/use-cases/candidate/get-one.usecases';

export function getCandidateProvide(provide) {
    return {
        inject: [LoggerService, UserRepository, CandidateRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository, candidateRepository: CandidateRepository) => new UseCaseProxy(new GetCandidateUseCases(logger, userRepository, candidateRepository)),
    };
}

export function getCandidatesProvide(provide) {
    return {
        inject: [LoggerService, UserRepository, CandidateRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository, candidateRepository: CandidateRepository) => new UseCaseProxy(new GetCandidatesUseCases(logger, userRepository, candidateRepository)),
    };
}

export function createCandidateProvide(provide) {
    return {
        inject: [LoggerService, UserRepository, CandidateRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository, candidateRepository: CandidateRepository) => new UseCaseProxy(new CreateCandidateUseCases(logger, userRepository, candidateRepository)),
    };
}
