import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fingerprint = require('express-fingerprint'); // !!!!!

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    Fingerprint({
      parameters: [
        // Defaults
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,
      ],
    }),
  );
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
