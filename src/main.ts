import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { initSwagger } from './utils/swagger.config';

export const log = new Logger(`Main.js`);
const PORT = 3000;
const HOSTNAME = 'localhost';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
