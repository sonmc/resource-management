import { DatabaseUserRepository } from '../repositories/user.repository';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { LoggerService } from '../logger/logger.service';
import { LogoutUseCases } from 'src/user-cases/auth/logout.usecases';
import { IsAuthenticatedUseCases } from 'src/user-cases/auth/isAuthenticated.usecases';
import { LoginUseCases } from 'src/user-cases/auth/login.usercases';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
    imports: [LoggerModule, JwtModule, JwtTokenService, BcryptModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    // Auth
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
    static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
    static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
                    provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
                    useFactory: (logger: LoggerService, jwtTokenService: JwtTokenService, config: EnvironmentConfigService, userRepo: DatabaseUserRepository, bcryptService: BcryptService) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
                },
                {
                    inject: [DatabaseUserRepository],
                    provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
                    useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
                },
                {
                    inject: [],
                    provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
                    useFactory: () => new UseCaseProxy(new LogoutUseCases()),
                },
            ],
            exports: [UsecasesProxyModule.LOGIN_USECASES_PROXY, UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY, UsecasesProxyModule.LOGOUT_USECASES_PROXY],
        };
    }
}
