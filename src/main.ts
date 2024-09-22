import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('InStock API')
    .setDescription('A description of your API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(env.PORT);
}
bootstrap();
