import { UserRepository } from 'src/presentation/repositories/user.repository';
import { CreateEmployeeUseCases } from 'src/usecases/employee/create-employee.usercase';
import { GetOneUseCases } from 'src/usecases/employee/get-one.usecases';
import { GetAllUseCases } from 'src/usecases/employee/get-all.usecases';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';

export function getOneProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new GetOneUseCases(logger, UserRepository)),
    };
}
export function getAllProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new GetAllUseCases(logger, UserRepository)),
    };
}
export function createEmployeeProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new CreateEmployeeUseCases(logger, UserRepository)),
    };
}
