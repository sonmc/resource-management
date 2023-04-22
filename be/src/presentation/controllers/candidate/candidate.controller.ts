import { Controller, UseGuards, Get, Post, Body, Query, Inject, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';

import { EndPoint } from 'src/domain/enums/endpoint.enum';

import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCandidateUseCases } from 'src/use-cases/candidate/create-candidate.usecase';
import { GetCandidateUseCases } from 'src/use-cases/candidate/get-one.usecases';
import { GetCandidatesUseCases } from 'src/use-cases/candidate/get-all.usecases';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path = require('path');

@Controller('candidates')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CandidateController {
    constructor(
        @Inject(UseCasesProxyModule.GET_CANDIDATES_USECASES_PROXY)
        private readonly getAllUseCaseProxy: UseCaseProxy<GetCandidatesUseCases>,
        @Inject(UseCasesProxyModule.GET_CANDIDATE_USECASES_PROXY)
        private readonly getOneUseCaseProxy: UseCaseProxy<GetCandidateUseCases>,
        @Inject(UseCasesProxyModule.CREATE_CANDIDATE_USECASES_PROXY)
        private readonly createCandidateUseCaseProxy: UseCaseProxy<CreateCandidateUseCases>
    ) {}

    @Get()
    @Permissions(EndPoint.CANDIDATE_GET)
    async get(@Query() query) {
        if (query.id) {
            return await this.getOneUseCaseProxy.getInstance().execute(query?.id);
        }
        const candidates = await this.getAllUseCaseProxy.getInstance().execute(query);
        return candidates;
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './dist/public/uploads/cvs',
                filename: (req, file, cb) => {
                    const filename: string = uuidv4();
                    const extension: string = path.parse(file.originalname).ext;
                    cb(null, `${filename}${extension}`);
                },
            }),
        })
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const candidateCreated = await this.createCandidateUseCaseProxy.getInstance().execute(file);
        return candidateCreated;
    }
}
