import 'dotenv/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task management')
    .setDescription(
      'Esta es un simple gestor de tareas. Puedes registrar un usuario, \
       autenticarte con un usuario y crear tareas, obtener todas tus tareas, \
       con la posibilidad de filtrarlas por estado (status - OPEN/DONE) o un texto (search) que contenga \
       el título o descripción de las mismas, obtener una tarea por id, cambiar el estado de una tarea \
       y eliminar una tarea',
    )
    .setVersion('1.0')
    .addServer('v1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    explorer: true,
    swaggerOptions: { filter: true, shwoRequestDuration: true },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false, value: false },
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
