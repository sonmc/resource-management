import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
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
import { PDFModule } from '@t00nday/nestjs-pdf';
import { jwtOptions } from './infrastructure/config/jwt.config';
import { PdfConfigService } from './infrastructure/config/pdf.config';
import { EventsModule } from './events/events.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        JwtModule.register(jwtOptions),
        PassportModule,
        LoggerModule,
        ExceptionsModule,
        UseCasesProxyModule.register(),
        ControllersModule,
        JwtServiceModule,
        PDFModule.registerAsync({
            useClass: PdfConfigService,
        }),
        EventsModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiTokenMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
