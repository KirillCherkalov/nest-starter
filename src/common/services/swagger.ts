import { NestApplication } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {
  private readonly app: NestApplication;

  constructor(app) {
    this.app = app;
  }

  public init() {
    const options = new DocumentBuilder()
      .setTitle('{Project name} API')
      .setDescription('{Project name} API description')
      .setVersion('1.0')
      .setBasePath('/api/v1')
      .build();

    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup('api/swagger', this.app, document);
  }
}
