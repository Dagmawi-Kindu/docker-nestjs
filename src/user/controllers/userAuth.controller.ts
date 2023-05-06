import {
  Body,
  Controller,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Param } from '@nestjs/common/decorators';
import { UserAuthService } from '../services/userAuth.service';
import { SignInDto, SignUpDto } from '../dto/userAuth.dto';

@Controller('user_auth')
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  sign_up(@Body() signUpDto: SignUpDto) {
    return this.userAuthService.sign_up(signUpDto);
  }
  @Post('signin')
  @UsePipes(ValidationPipe)
  sign_in(@Body() signInDto: SignInDto) {
    return this.userAuthService.sign_in(signInDto);
  }
  @Post('test/:uid')
  @UsePipes(ValidationPipe)
  test(@Param('uid', ParseUUIDPipe) uid: string) {
    return this.userAuthService.checkRole(uid);
  }
}
