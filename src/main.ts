import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customConfigService = app.get(CustomConfigService);
  const appPort = customConfigService.get<number>('APP_PORT');

  const options = new DocumentBuilder()
    .setTitle('comments')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${appPort}/api`)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/swagger', app, document);

  app.setGlobalPrefix('api/');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors({ origin: '*' });
  app.use(helmet());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(appPort);
}

bootstrap();
