import { Body, Controller, Get, Inject, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Headers } from '@nestjs/common';
import { AuthLoginDto } from './presenter/auth-dto.class';
import { AuthPresenter } from './presenter/auth.presenter';

import JwtRefreshGuard from '../../../infrastructure/common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from '../../../infrastructure/common/guards/jwtAuth.guard';
import { LoginGuard } from '../../../infrastructure/common/guards/login.guard';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';

import { ApiResponseType } from '../../../infrastructure/common/swagger/response.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
    status: 401,
    description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AuthPresenter)
export class AuthController {
    constructor(
        @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
        private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
        @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
        private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
        @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
        private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>
    ) {}

    @Post('login')
    @UseGuards(LoginGuard)
    @ApiBody({ type: AuthLoginDto })
    async login(@Body() auth: AuthLoginDto, @Request() request: any) {
        const accessToken = await this.loginUsecaseProxy.getInstance().getJwtToken(auth.username);
        const refreshToken = await this.loginUsecaseProxy.getInstance().getJwtRefreshToken(auth.username);
        const curentUser = new AuthPresenter(request.user);
        //request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return {
            accessToken,
            refreshToken,
            curentUser,
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Request() request: any) {
        const cookie = await this.logoutUsecaseProxy.getInstance().execute();
        request.res.setHeader('Set-Cookie', cookie);
        return 'Logout successful';
    }

    @Get('is_authenticated')
    @ApiResponseType(AuthPresenter, false)
    async isAuthenticated(@Headers() headers) {
        const user = await this.isAuthUsecaseProxy.getInstance().execute(headers.authentication);
        const response = new AuthPresenter(user);
        return response;
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    @ApiBearerAuth()
    async refresh(@Req() request: any) {
        const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getJwtToken(request.user.username);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return 'Refresh successful';
    }
}
