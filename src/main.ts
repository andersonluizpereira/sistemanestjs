import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { CustomLogger } from './shared/services/logger.service';
import * as compression from 'compression';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions,{ logger: new CustomLogger() });
  app.use(compression());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();