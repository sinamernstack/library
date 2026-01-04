import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function Pagination() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      schema: { type: 'integer', minimum: 1, default: 1 },
      description: 'Page number'
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      schema: { type: 'integer', minimum: 1, default: 10 },
      description: 'Number of items per page'
    }),
    UsePipes(
      new ValidationPipe({
        transform: true,
        whitelist: true
      })
    )
  );
}
