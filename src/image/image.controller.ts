import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ImageService } from './image.service';
import { multerImageConfig } from './multer-config';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', multerImageConfig))
  public uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.imageService.uploadImage(req, file);
  }
}
