import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UseCasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../use-cases/auth/login.usecases';
import { AuthEntity } from '../../../domain/entities/auth.entity';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
        private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
        private readonly logger: LoggerService,
        private readonly exceptionService: ExceptionsService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request;
                },
            ]),
            secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, authEntity: AuthEntity) {
        const refreshToken = '';
        const user = this.loginUsecaseProxy.getInstance().getUserIfRefreshTokenMatches(refreshToken, authEntity.username);
        if (!user) {
            this.logger.warn('JwtStrategy', `User not found or hash not correct`);
            this.exceptionService.UnauthorizedException({ message: 'User not found or hash not correct' });
        }
        return user;
    }
}
