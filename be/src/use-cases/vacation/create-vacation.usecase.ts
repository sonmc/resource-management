import { VacationEntity } from 'src/domain/entities/vacation.entity';
import { ILogger } from 'src/domain/logger/logger.interface';
import { IVacationRepository } from 'src/domain/repositories/vacation-repository.interface';

export class CreateVacationUseCases {
    constructor(private readonly logger: ILogger, private readonly vacationRepository: IVacationRepository) {}

    async execute(vacationE: VacationEntity): Promise<any> {
        const vacation = await this.vacationRepository.create(vacationE);
        this.logger.log('createVacationUseCases execute', 'New vacation have been inserted');
        return vacation;
    }
}
