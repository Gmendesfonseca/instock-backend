import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ConsoleLogger,
  LogLevel,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('InStock API')
    .setDescription('List of available endpoints for InStock API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const logLevels = configService.get<LogLevel[]>('LOG_LEVEL');

  app.useLogger(new ConsoleLogger('InStock Backend', { logLevels }));

  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
      enableDebugMessages: true,
    }),
  );

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
