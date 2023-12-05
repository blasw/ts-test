import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  imports: [PrismaModule],
  providers: [PdfService],
  controllers: [PdfController],
  exports: [],
})
export class PdfModule {}
