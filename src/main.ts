import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}); // Enable CORS for all routes just for testing app.

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Advenus')
    .setDescription(
      'This backend is built using NestJS and Prisma, providing a modular and scalable REST API for managing city and landmark data.'
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
