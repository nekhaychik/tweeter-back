import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user';
import { AuthenticationService } from './application';
import { AuthController } from './controller';
import { JwtRefreshGuard } from './guard';
import { JwtRefreshTokenStrategy } from './strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  exports: [AuthenticationService],
  providers: [
    AuthenticationService,
    JwtRefreshGuard,
    JwtRefreshTokenStrategy,
    JwtService,
  ],
})
export class AuthModule {}
