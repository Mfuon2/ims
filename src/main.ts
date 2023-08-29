import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initSwagger } from './utils/swagger.config';
import { TransformInterceptor } from './interceptors/response.interceptor';
import { LocalDateTime } from '@js-joda/core';

export const log = new Logger(`Main.js`);
process.env.TZ = 'Africa/Nairobi';
export const today = LocalDateTime.now();
const PORT = 3000;
const HOSTNAME = 'localhost';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await initSwagger(app).then(() => {
    log.log(`Initialised Swagger documentation`);
  });
  app.enableCors();
  await app.listen(PORT, HOSTNAME).then(() => {
    log.log(`Server :  http://${HOSTNAME}:${PORT}`);
    log.log(`APIs   :  http://${HOSTNAME}:${PORT}/api`);
    log.log(`Time   :  ${today}`);
  });
}

bootstrap().then(() => {
  log.log('Application started');
});
