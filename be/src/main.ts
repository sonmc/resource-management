import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useStaticAssets(join(__dirname, '../dist/public'));
    app.use(cookieParser());
    await app.listen(5000, '0.0.0.0');
    console.log('server is running on port: 5000');
}
bootstrap();
