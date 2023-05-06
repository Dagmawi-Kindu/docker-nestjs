import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { UserAuthService } from 'src/user/services/userAuth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UserAuthService)
    private userAuthService: UserAuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    console.log(req?.body?.authenticatedUser);
    if (
      await this.userAuthService.checkRole(req?.body?.authenticatedUser?.id)
    ) {
      return true;
    }

    return false;
  }
}
