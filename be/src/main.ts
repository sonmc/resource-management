import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useStaticAssets(join(__dirname, '../dist/public'));
    app.use(cookieParser());
    const config = new DocumentBuilder().setTitle('API Swagger').setDescription('The API description').setVersion('1.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1', app, document);
    await app.listen(5000, '0.0.0.0');
    console.log('server is running on port: 5000');
}
bootstrap();
