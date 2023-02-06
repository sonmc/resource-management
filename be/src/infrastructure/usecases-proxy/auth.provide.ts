import { UserRepository } from 'src/presentation/repositories/user.repository';
import { IsAuthenticatedUseCases } from 'src/use-cases/auth/isAuthenticated.usecases';
import { LoginUseCases } from 'src/use-cases/auth/login.usecases';
import { LoggerService } from '../logger/logger.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { UseCaseProxy } from './usecases-proxy';

export function getLoginProvide(proxy) {
  return {
    inject: [LoggerService, JwtTokenService, UserRepository, BcryptService],
    provide: proxy,
    useFactory: (logger: LoggerService, jwtTokenService: JwtTokenService, userRepo: UserRepository, bcryptService: BcryptService) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, userRepo, bcryptService)),
  };
}
export function isAuthenticatedProvide(proxy) {
  return {
    inject: [UserRepository],
    provide: proxy,
    useFactory: (userRepo: UserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
  };
}
