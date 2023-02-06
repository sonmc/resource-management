import { Body, Controller, Get, Inject, Post, Req, Request, UseGuards } from '@nestjs/common';

import { Headers } from '@nestjs/common';
import { AuthLoginDto } from './presenter/auth-dto.class';
import { AuthPresenter } from './presenter/auth.presenter';

import JwtRefreshGuard from '../../../infrastructure/common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from '../../../infrastructure/common/guards/jwtAuth.guard';
import { LocalGuard } from '../../../infrastructure/common/guards/login.guard';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../use-cases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../use-cases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../use-cases/auth/logout.usecases';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UseCasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessToken = await this.loginUsecaseProxy.getInstance().getJwtToken(auth.username);
    const refreshToken = await this.loginUsecaseProxy.getInstance().getJwtRefreshToken(auth.username);
    const currentUser = new AuthPresenter(request.user);
    request.res.setHeader('Set-Cookie', [accessToken, refreshToken]);
    return {
      accessToken,
      refreshToken,
      currentUser,
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
  async isAuthenticated(@Headers() headers) {
    const user = await this.isAuthUsecaseProxy.getInstance().execute(headers.authentication);
    const response = new AuthPresenter(user);
    return response;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}
