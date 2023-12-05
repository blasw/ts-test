import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    try {
      const [storedUser, providedHashedPassword] = await Promise.all([
        await this.prismaService.getUser(email),
        bcrypt.hash(password, 10),
      ]);

      if (!bcrypt.compare(providedHashedPassword, storedUser.password)) {
        throw new Error('Invalid password provided');
      }

      const payload = { sub: storedUser.email, username: storedUser.firstName };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const newUser: User = {
        email: email,
        password: await bcrypt.hash(password, 10),
        firstName: firstName,
        lastName: lastName,
        image: null,
        pdf: null,
      };
      const createdUser = await this.prismaService.createUser(newUser);
      const payload = {
        sub: createdUser.email,
        username: createdUser.firstName,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      throw new HttpException({ Error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
