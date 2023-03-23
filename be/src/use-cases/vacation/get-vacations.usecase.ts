import { IVacationRepository } from 'src/domain/repositories/vacation-repository.interface';

export class GetVacationUseCases {
    constructor(private readonly vacationRepository: IVacationRepository) {}

    async execute(filter: any, paging: any): Promise<any> {
        const res = await this.vacationRepository.findAll(filter, paging);
        return res;
    }
}
