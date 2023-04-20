import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { ICandidateRepository } from 'src/domain/repositories/candidate.repository.interface';
import { GetFileExtension } from 'src/actions/common';
import { ExtractPdf, ExtractDocx } from 'src/actions/file.action';
import { Candidate } from 'src/infrastructure/schemas/candidate.schema';

export class CreateCandidateUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly candidateRepository: ICandidateRepository) {}

    async execute(file: any): Promise<Candidate> {
        let candidate_created = new Candidate();
        const extension = GetFileExtension(file.filename);
        let content = '';
        switch (extension) {
            case '.pdf':
                content = ExtractPdf(file);
                break;
            case '.docx':
            case '.doc':
                content = await ExtractDocx(file);
                break;
            default:
                return null;
        }

        return candidate_created;
    }
}
