import { plainToInstance } from 'class-transformer';
import { convertPermissions, convertRoles } from 'src/actions/auth.action';
import { Body, Controller, Get, Inject, Post, Req, Res, Request, UseGuards } from '@nestjs/common';

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
import { UserRepository } from 'src/presentation/repositories/user.repository';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
        private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
        @Inject(UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
        private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
        private readonly userRepository: UserRepository
    ) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Body() auth: AuthLoginDto, @Request() request: any) {
        const accessToken = await this.loginUsecaseProxy.getInstance().getJwtToken(auth.username);
        const refreshToken = await this.loginUsecaseProxy.getInstance().getJwtRefreshToken(auth.username);
        request.res.cookie('access_token', accessToken, { httpOnly: true });
        request.res.cookie('refresh_token', refreshToken, { httpOnly: true });
        return;
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Res() res: any) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.sendStatus(204);
    }

    @Get('getCurrentUser')
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@Request() request: any) {
        const currentUser = new AuthPresenter();
        currentUser.user_id = request.user.id;
        currentUser.username = request.user.username;
        currentUser.avatar = request.user.avatar;
        currentUser.first_name = request.user.first_name;
        currentUser.last_name = request.user.last_name;
        currentUser.full_name = request.user.first_name + ' ' + request.user.last_name;
        currentUser.permissions = convertPermissions(request.user.roles);
        currentUser.roles = convertRoles(request.user.roles);
        currentUser.projects = await this.userRepository.getProjects(request.user.id);
        return currentUser;
    }

    @Get('is_authenticated')
    async isAuthenticated(@Headers() headers) {
        const user = await this.isAuthUsecaseProxy.getInstance().execute(headers.authentication);
        const response = plainToInstance(AuthPresenter, user);
        return response;
    }

    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    async refresh(@Request() request: any, @Res() res: any) {
        const accessToken = await this.loginUsecaseProxy.getInstance().getJwtToken(request.user.username);
        request.res.cookie('access_token', accessToken, { httpOnly: true });
        request.res.sendStatus(204);
    }
}
