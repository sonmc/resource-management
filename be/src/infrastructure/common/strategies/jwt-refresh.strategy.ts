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
                    return request?.cookies?.refresh_token;
                },
            ]),
            secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(payload: any) {
        const { refresh_token } = payload.cookies;
        const user = await this.loginUsecaseProxy.getInstance().getUserIfRefreshTokenMatches(refresh_token, payload.body.username);
        if (!user) {
            this.logger.warn('JwtStrategy', `User not found or hash not correct`);
            this.exceptionService.UnauthorizedException({ message: 'User not found or hash not correct' });
        }
        return user;
    }
}
