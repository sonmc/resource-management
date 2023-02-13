import { Module, CacheModule, CacheInterceptor, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './presentation/controllers/controllers.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './infrastructure/config/typeorm.config';
import { ApiTokenMiddleware } from './presentation/middleware/api-token.middleware';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisOptions } from './infrastructure/config/redis.config';
import { jwtOptions } from './infrastructure/config/jwt.config';
@Module({
  imports: [
    CacheModule.register(redisOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    JwtModule.register(jwtOptions),
    PassportModule,
    LoggerModule,
    ExceptionsModule,
    UseCasesProxyModule.register(),
    ControllersModule,
    JwtServiceModule,
    CacheInterceptor,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
