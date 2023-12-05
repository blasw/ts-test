import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const AllowedExtensions = ['.jpg', '.jpeg', '.png'];
const MaxFileSize = 1024 * 1024 * 5; // 5MB

export const multerImageConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      cb(null, `${uniqueSuffix}${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!AllowedExtensions.includes(extname(file.originalname))) {
      return cb(new BadRequestException('Invalid file type'));
    }

    if (file.size > MaxFileSize) {
      return cb(new BadRequestException('File is too large'));
    }
    cb(null, true);
  },
};
