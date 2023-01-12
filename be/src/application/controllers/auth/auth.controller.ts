import { Body, Controller, Get, Inject, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthLoginDto } from './dto/auth-dto.class';
import { IsAuthPresenter } from './dto/auth.presenter';

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
@ApiExtraModels(IsAuthPresenter)
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
        const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(auth.username);
        const refreshTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtRefreshToken(auth.username);
        //request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return {
            accessTokenCookie,
            refreshTokenCookie,
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'logout' })
    async logout(@Request() request: any) {
        const cookie = await this.logoutUsecaseProxy.getInstance().execute();
        request.res.setHeader('Set-Cookie', cookie);
        return 'Logout successful';
    }

    @Get('is_authenticated')
    @UseGuards(JwtAuthGuard)
    @ApiResponseType(IsAuthPresenter, false)
    async isAuthenticated(@Req() request: any) {
        const user = await this.isAuthUsecaseProxy.getInstance().execute(request.user.username);
        const response = new IsAuthPresenter();
        response.username = user.username;
        return response;
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    @ApiBearerAuth()
    async refresh(@Req() request: any) {
        const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(request.user.username);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return 'Refresh successful';
    }
}
