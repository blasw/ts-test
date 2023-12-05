import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { PdfService } from './pdf.service';

@Controller()
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get('/pdf')
  @UseGuards(AuthGuard)
  generatePdf(@Req() req: Request) {
    return this.pdfService.generatePdf(req);
  }
}
