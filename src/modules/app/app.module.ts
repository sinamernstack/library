import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'; // Import ServeStaticModule
import { TypeOrmDbConfig } from 'src/config/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SwaggerController } from './swagger.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(TypeOrmDbConfig()),
    UserModule,
    AuthModule,
    CategoryModule,

  ],
  controllers: [SwaggerController], 
    
  providers: [],
})
export class AppModule {}
