import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { NewRepository } from 'src/presentation/repositories/new.repository';
import { CreateNewUseCases } from 'src/use-cases/new/create-new.usecase';
import { GetNewsUseCases } from 'src/use-cases/new/get-all.usecases';

export function getNewsProvide(provide) {
    return {
        inject: [LoggerService, NewRepository],
        provide,
        useFactory: (logger: LoggerService, newRepository: NewRepository) => new UseCaseProxy(new GetNewsUseCases(logger, newRepository)),
    };
}
export function createNewProvide(provide) {
    return {
        inject: [LoggerService, NewRepository],
        provide,
        useFactory: (logger: LoggerService, newRepository: NewRepository) => new UseCaseProxy(new CreateNewUseCases(logger, newRepository)),
    };
}
