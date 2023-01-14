import { UserRepository } from 'src/application/repositories/user.repository';
import { CreateEmployeeUseCases } from 'src/usecases/employee/create-employee.usercase';
import { GetEmployeeUseCases } from 'src/usecases/employee/get-employee.usecases';
import { GetEmployeesUseCases } from 'src/usecases/employee/get-employees.usecases';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';

export function getEmployeesProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new GetEmployeesUseCases(logger, UserRepository)),
    };
}
export function getEmployeeProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new GetEmployeeUseCases(logger, UserRepository)),
    };
}
export function createEmployeeProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new CreateEmployeeUseCases(logger, UserRepository)),
    };
}
