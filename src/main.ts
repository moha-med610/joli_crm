import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = {};

        errors.forEach((error) => {
          formattedErrors[error.property] = Object.values(
            error.constraints || {},
          );
        });

        return new BadRequestException({
          message: 'Validation Error',
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
