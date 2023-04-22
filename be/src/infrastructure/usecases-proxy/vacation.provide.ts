import { VacationRepository } from './../../presentation/repositories/vacation.repository';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { GetVacationUseCases } from 'src/use-cases/vacation/get-vacations.usecase';
import { CreateVacationUseCases } from 'src/use-cases/vacation/create-vacation.usecase';
import { ChangeStatusUseCases } from 'src/use-cases/vacation/change-status.usecase';

export function getVacationsProvide(provide) {
    return {
        inject: [VacationRepository],
        provide,
        useFactory: (vacationRepository: VacationRepository) => new UseCaseProxy(new GetVacationUseCases(vacationRepository)),
    };
}
export function createVacationProvide(provide) {
    return {
        inject: [LoggerService, VacationRepository],
        provide,
        useFactory: (logger: LoggerService, vacationRepository: VacationRepository) => new UseCaseProxy(new CreateVacationUseCases(logger, vacationRepository)),
    };
}
export function changeStatusProvide(provide) {
    return {
        inject: [LoggerService, VacationRepository],
        provide,
        useFactory: (logger: LoggerService, vacationRepository: VacationRepository) => new UseCaseProxy(new ChangeStatusUseCases(logger, vacationRepository)),
    };
}
