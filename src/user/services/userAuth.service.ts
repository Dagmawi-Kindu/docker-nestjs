import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { ISignIn, ISignUp } from '../user.interface';

@Injectable()
export class UserAuthService {
  constructor(private prisma: PrismaService) {}
  async checkRole(id: string): Promise<Boolean> {
    if (!id) {
      return false;
    }
    let foundUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!foundUser) return false;
    if (foundUser.role === Role.USER) return true;
  }

  async sign_up(signup: ISignUp) {
    let { password, ...others } = signup;
    let checkUserExistence = await this.prisma.user.findFirst({
      where: {
        ...others,
      },
    });

    if (checkUserExistence) {
      throw new HttpException('User Already Exists!', HttpStatus.BAD_REQUEST);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return await this.prisma.user.create({
      data: {
        ...others,
        password: hash,
      },
    });
  }
  async sign_in(signin: ISignIn) {
    const { email, password } = signin;
    //checks if the user exists
    let foundAuth = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!foundAuth) {
      throw new HttpException(
        "Sorry, the entered credential doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }

    //checks if the given password is correct
    const checkPassword = await bcrypt.compare(password, foundAuth.password);
    if (!checkPassword) {
      throw new HttpException('Incorrect password!', HttpStatus.BAD_REQUEST);
    }
    const { password: thePassword, ...remaining } = foundAuth;

    let token = jwt.sign(
      {
        id: foundAuth.id,
      },
      process.env.JWT_KEY,
    );

    return {
      ...remaining,
      access_token: token,
    };
  }
}
