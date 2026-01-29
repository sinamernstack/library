import { Request } from 'express';
import { mkdirSync } from 'fs';
import { extname, join } from 'path';
import { ValidationMessage } from '../enums/message.enum';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export type MulterCallback = (error: Error | null, destination: string) => void;

export type MulterFile = Express.Multer.File;

export function multerDestination(folderName: string) {
  return function (req: Request, file: MulterFile, callback: MulterCallback): void {
    const path = join('public', 'uploads', folderName);
    mkdirSync(path, { recursive: true });
    callback(null, path);
  };
}
export function multerFilename(req: Request, file: MulterFile, callback: MulterCallback) {
  const ext = extname(file.originalname).toLowerCase();

  if (!isValidImageFormat(ext)) {
    return callback(new BadRequestException(ValidationMessage.InvalidImageFormat), '');
  }

  const filename = `${Date.now()}${ext}`;
  callback(null, filename);
}

function isValidImageFormat(ext: string) {
  return ['.png', '.jpg', '.jpeg'].includes(ext);
}
export function multerDiskStorage(folderName: string) {
  return diskStorage({
    destination: multerDestination(folderName),
    filename: multerFilename
  });
}
