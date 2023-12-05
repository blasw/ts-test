import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private prismaService: PrismaService) {}

  public async uploadImage(req: Request, file: Express.Multer.File) {
    try {
      await this.prismaService.saveImagePath(req['user'].sub, file.path);
    } catch (err) {
      throw err;
    }
  }
}
