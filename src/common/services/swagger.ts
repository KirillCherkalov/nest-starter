import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {
  private readonly app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  public init(): void {
    const options = new DocumentBuilder()
      .setTitle('{Project name} API')
      .setDescription('{Project name} API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(this.app, options);

    SwaggerModule.setup('api/swagger', this.app, document);
  }
}
