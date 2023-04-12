import { ILogger } from '../../domain/logger/logger.interface';
import { INewRepository } from 'src/domain/repositories/new-repository.interface';
import { NewEntity } from 'src/domain/entities/new.entity';

export class CreateNewUseCases {
    constructor(private readonly logger: ILogger, private readonly newRepository: INewRepository) {}

    async execute(newEntity: NewEntity): Promise<NewEntity> {
        const newE = await this.newRepository.create(newEntity);
        this.logger.log('createNewUseCases execute', 'New have been inserted');
        return newE;
    }
}
