import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PdfService {
  constructor(private prismaService: PrismaService) {}

  async generatePdf(req: Request): Promise<object> {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

    try {
      const email: string = req['user'].sub;
      const user = await this.prismaService.getUser(email);

      if (user.pdf) {
        return { message: 'Pdf is already generated' };
      }

      const { firstName, lastName } = user;
      let imagePath: string = user.image;
      if (!imagePath) {
        imagePath = './uploads/default.jpg';
      }

      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
      }

      let imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
      imageBase64 = 'data:image/jpeg;base64,' + imageBase64;

      const docDefinition: TDocumentDefinitions = {
        content: [
          {
            image: imageBase64,
            width: 400,
            alignment: 'center',
          },
          {
            text: `${firstName} ${lastName}`,
            fontSize: 20,
            alignment: 'center',
          },
        ],
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);

      pdfDocGenerator.getBuffer(async (buffer: Buffer) => {
        const binary = buffer.toString('binary');

        fs.writeFileSync(`./pdfs/${email}.pdf`, buffer);

        await this.prismaService.savePdfBinary(email, buffer);
      });

      return { message: 'Pdf generated' };
    } catch (err) {
      throw new HttpException(
        { Err: 'Unable to generate pdf' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
