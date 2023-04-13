import { Controller, UseGuards, Get, Inject } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { GetLunchOrderUseCases } from 'src/use-cases/lunch-order/get-lunch-order.usecase';

@Controller('lunch-order')
@UseGuards(JwtAuthGuard)
export class LunchOrderController {
    constructor(
        @Inject(UseCasesProxyModule.GET_LUNCH_ORDER_USECASES_PROXY)
        private readonly getLunchOrderUseCaseProxy: UseCaseProxy<GetLunchOrderUseCases>
    ) {}

    @Get()
    async get() {
        const lunchOrders = await this.getLunchOrderUseCaseProxy.getInstance().execute();
        return lunchOrders;
    }
}
