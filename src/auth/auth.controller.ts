import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dtos/signIn.dto';
import { SignUpReqDto } from './dtos/signUp.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    reqBody: SignInReqDto,
  ) {
    return this.authService.signIn(reqBody.email, reqBody.password);
  }

  @Post('signup')
  signUp(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    reqBody: SignUpReqDto,
  ) {
    return this.authService.signUp(
      reqBody.email,
      reqBody.password,
      reqBody.firstName,
      reqBody.lastName,
    );
  }
}
