import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export function TypeOrmDbConfig(): TypeOrmModuleOptions {
  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
    process.env;
  return {
    type: 'postgres',
    port: +DB_PORT,
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    autoLoadEntities: false,
    entities: [
      'dist/**/**/**/*.entity{.ts,.js}',
      'dist/**/**/*.entity{.ts,.js}',
    ],
  };
}
