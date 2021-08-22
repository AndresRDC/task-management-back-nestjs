import 'dotenv/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
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
