import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { initSwagger } from './utils/swagger.config';
import { TransformInterceptor } from './interceptors/response.interceptor';

export const log = new Logger(`Main.js`);
const PORT = 3000;
const HOSTNAME = 'localhost';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  await initSwagger(app).then(() => {
    log.log(`Initialised Swagger documentation`);
  });
  app.enableCors();
  await app.listen(PORT, HOSTNAME).then(() => {
    log.log(`Server started on http://${HOSTNAME}:${PORT}`);
    log.log(`APIs on http://${HOSTNAME}:${PORT}/api`);
  });
}

bootstrap().then(() => {
  log.log('Application started');
});
