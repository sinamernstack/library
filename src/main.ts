import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigInit } from './config/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfigInit(app);
  await app.listen(process.env.PORT, () =>
    console.log(`Server running on port : ${process.env.PORT}`),
  );
  console.log(`Swagger running on : http://localhost:${process.env.PORT}/swagger`);
}
bootstrap();
   