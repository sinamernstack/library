import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class SwaggerController {
  @Get('/swagger.json')
  getSwaggerJson(@Res() res: Response) {
    const filePath = join(process.cwd(), 'swagger.json'); // مسیر فایل ذخیره‌شده
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(filePath);
  }
}
