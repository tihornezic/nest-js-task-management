import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  // whenever you encounter a validation decorator,
  // run validation pipe => it saves us from a lot of code
  // at the controller level
  app.useGlobalPipes(new ValidationPipe());
  // we don't have anymore user information when returning a task
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = 3000;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
