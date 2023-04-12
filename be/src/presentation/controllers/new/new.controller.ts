import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { EndPoint } from 'src/domain/enums/endpoint.enum';
import { GetNewsUseCases } from 'src/use-cases/new/get-all.usecases';

@Controller('news')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NewController {
    constructor(
        @Inject(UseCasesProxyModule.GET_NEWS_USECASES_PROXY)
        private readonly getNewsUseCaseProxy: UseCaseProxy<GetNewsUseCases>
    ) {}

    @Get()
    @Permissions(EndPoint.NEW_GET)
    async get() {
        const newInstance = this.getNewsUseCaseProxy.getInstance();
        const news = await newInstance.execute();
        return news;
    }
}
