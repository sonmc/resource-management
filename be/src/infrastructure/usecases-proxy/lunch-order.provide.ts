import { LunchOrderRepository } from 'src/presentation/repositories/lunch-order.repository';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { GetLunchOrderUseCases } from 'src/use-cases/lunch-order/get-lunch-order.usecase';

// export function addLunchOrderProvide(provide) {
//     return {
//         inject: [LoggerService, LunchOrderRepository],
//         provide,
//         useFactory: (logger: LoggerService, lunchOrderRepository: LunchOrderRepository) => new UseCaseProxy(new AddLunchOrderUseCases(logger, lunchOrderRepository)),
//     };
// }
export function getLunchOrderProvide(provide) {
    return {
        inject: [LoggerService, LunchOrderRepository],
        provide,
        useFactory: (logger: LoggerService, lunchOrderRepository: LunchOrderRepository) => new UseCaseProxy(new GetLunchOrderUseCases(logger, lunchOrderRepository)),
    };
}
