import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // whenever you encounter a validation decorator,
  // run validation pipe => it saves us from a lot of code
  // at the controller level
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
