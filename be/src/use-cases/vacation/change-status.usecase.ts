import { ILogger } from 'src/domain/logger/logger.interface';
import { IVacationRepository } from 'src/domain/repositories/vacation-repository.interface';

export class ChangeStatusUseCases {
    constructor(private readonly logger: ILogger, private readonly vacationRepository: IVacationRepository) {}

    async execute(vacation_id: number, status: number): Promise<any> {
        const vacation = await this.vacationRepository.changeStatus(vacation_id, status);
        this.logger.log('changeStatusUseCases execute', 'Status vacation have been updated');
        return vacation;
    }
}
