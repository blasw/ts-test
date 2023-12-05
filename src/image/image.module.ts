import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [PrismaModule],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [],
})
export class ImageModule {}
