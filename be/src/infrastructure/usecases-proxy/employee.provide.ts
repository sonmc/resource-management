import { UserRepository } from 'src/presentation/repositories/user.repository';
import { CreateEmployeeUseCases } from 'src/use-cases/employee/create-employee.usecase';
import { GetOneUseCases } from 'src/use-cases/employee/get-one.usecases';
import { GetAllUseCases } from 'src/use-cases/employee/get-all.usecases';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { DeleteEmployeeUseCases } from 'src/use-cases/employee/delete-employee.usecase';
import { LunchOrderRepository } from 'src/presentation/repositories/lunch-order.repository';

export function getOneProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository) => new UseCaseProxy(new GetOneUseCases(logger, userRepository)),
    };
}
export function getAllProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository) => new UseCaseProxy(new GetAllUseCases(logger, userRepository)),
    };
}
export function createEmployeeProvide(provide) {
    return {
        inject: [LoggerService, UserRepository, LunchOrderRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository, lunchOrderRepository: LunchOrderRepository) => new UseCaseProxy(new CreateEmployeeUseCases(logger, userRepository, lunchOrderRepository)),
    };
}
export function deleteEmployeeProvide(provide) {
    return {
        inject: [LoggerService, UserRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository) => new UseCaseProxy(new DeleteEmployeeUseCases(logger, userRepository)),
    };
}
