import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { EndPoint } from 'src/domain/enums/endpoint.enum';
import { GetNewsUseCases } from 'src/use-cases/new/get-all.usecases';
import { plainToClass } from 'class-transformer';
import { NewEntity } from 'src/domain/entities/new.entity';
import { CreateNewPresenter } from './presenter/create-new.presenter';
import { CreateNewUseCases } from 'src/use-cases/new/create-new.usecase';

@Controller('news')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NewController {
    constructor(
        @Inject(UseCasesProxyModule.GET_NEWS_USECASES_PROXY)
        private readonly getNewsUseCaseProxy: UseCaseProxy<GetNewsUseCases>,
        @Inject(UseCasesProxyModule.CREATE_NEW_USECASES_PROXY)
        private readonly createNewUseCaseProxy: UseCaseProxy<CreateNewUseCases>
    ) {}

    @Get()
    @Permissions(EndPoint.NEW_GET)
    async get() {
        const newInstance = this.getNewsUseCaseProxy.getInstance();
        const news = await newInstance.execute();
        return news;
    }

    @Post()
    @Permissions(EndPoint.NEW_CREATE)
    async create(@Body() newPresenter: CreateNewPresenter) {
        const newEntity = plainToClass(NewEntity, newPresenter);
        return await this.createNewUseCaseProxy.getInstance().execute(newEntity);
    }
}
