import { UserRepository } from 'src/presentation/repositories/user.repository';
import { IsAuthenticatedUseCases } from 'src/use-cases/auth/isAuthenticated.usecases';
import { LoginUseCases } from 'src/use-cases/auth/login.usecases';
import { LoggerService } from '../logger/logger.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { UseCaseProxy } from './usecases-proxy';

export function getLoginProvide(proxy) {
  return {
    inject: [LoggerService, JwtTokenService, UserRepository],
    provide: proxy,
    useFactory: (logger: LoggerService, jwtTokenService: JwtTokenService, userRepo: UserRepository) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, userRepo)),
  };
}
export function isAuthenticatedProvide(proxy) {
  return {
    inject: [UserRepository],
    provide: proxy,
    useFactory: (userRepo: UserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
  };
}
