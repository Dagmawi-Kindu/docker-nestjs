import { Module } from '@nestjs/common';
import { UserAuthService } from './services/userAuth.service';
import { UserAuthController } from './controllers/userAuth.controller';

@Module({
  imports: [],
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserModule {}
