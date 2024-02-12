import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { writeFile } from 'fs';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File) {}
}
