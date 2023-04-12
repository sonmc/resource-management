import { ILogger } from '../../domain/logger/logger.interface';
import { NewEntity } from 'src/domain/entities/new.entity';
import { INewRepository } from 'src/domain/repositories/new-repository.interface';

export class GetNewsUseCases {
    constructor(private readonly logger: ILogger, private readonly newRepository: INewRepository) {}

    async execute(): Promise<NewEntity[]> {
        return await this.newRepository.findAll();
    }
}
