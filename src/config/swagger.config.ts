import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function SwaggerConfigInit(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Virgool API')
    .setDescription('NestJS Virgool API description')
    .setVersion('0.0.1')
    
    // اضافه کردن Bearer Token به عنوان Authorization
    .addBearerAuth(SwaggerAuthConfig(), 'Authorization')
    
    // اضافه کردن اطلاعات برای استفاده از کوکی‌ها
    .addSecurity('cookieAuth', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
      description: 'Access token (Stored in cookie for secure access)'
    })
    
    // سرور برای تست (Optional)
    .addServer('http://localhost:3400')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, swaggerDocument);
  
  // ذخیره کردن فایل Swagger JSON برای دسترسی راحت‌تر
  const swaggerJsonPath = join(process.cwd(), '/src/swagger/swagger.json');
  writeFileSync(swaggerJsonPath, JSON.stringify(swaggerDocument, null, 2));
}

function SwaggerAuthConfig(): SecuritySchemeObject {
  return {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header'
  };
}
