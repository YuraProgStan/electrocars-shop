import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";
dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
      .setTitle('Electrocars')
      .setDescription('The user API description')
      .setVersion('1.0')
      .addTag('september-2021')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger',  app, document);


  await app.listen(PORT, () => console.log(`Server has been started on PORT = ${PORT}`));
}
bootstrap();
