import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type User = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  image?: string;
  pdf?: Buffer;
};

@Injectable()
export class PrismaService extends PrismaClient {
  public async createUser(userReq: User): Promise<User> {
    try {
      const user: User = await this.user.create({
        data: {
          email: userReq.email,
          password: userReq.password,
          firstName: userReq.firstName,
          lastName: userReq.lastName,
          image: userReq.image,
          pdf: userReq.pdf,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  public async getUser(userEmail: string): Promise<User> {
    try {
      const user: User = await this.user.findFirst({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  public async saveImagePath(email: string, path: string): Promise<void> {
    try {
      await this.user.update({
        where: {
          email: email,
        },
        data: {
          image: path,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  public async savePdfBinary(email: string, pdf: Buffer): Promise<void> {
    try {
      await this.user.update({
        where: {
          email: email,
        },
        data: {
          pdf: pdf,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
