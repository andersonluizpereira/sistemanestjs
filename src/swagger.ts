import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): any {
  const logger: Logger = new Logger('Swagger');
  const swaggerEndpoint = '/api/v2/api-docs';

  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API do curso Petshop')
    .setVersion('1.0.0')
    .addTag('petshop')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
  logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}
