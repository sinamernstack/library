import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigInit } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true
    })
  )
  SwaggerConfigInit(app);
  
  app.use(cookieParser(process.env.COOKIE_SECRET));
  await app.listen(process.env.PORT, () => console.log(`Server running on port : ${process.env.PORT}`));
  console.log(`Swagger running on : http://localhost:${process.env.PORT}/swagger`);
}
bootstrap();
