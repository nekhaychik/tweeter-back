import { Module } from '@nestjs/common';

// Modules
import { UserModule } from '../user';
import { AuthRefreshTokenModule } from '../auth-refresh-token';

// Services
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './application';
import { JwtRefreshTokenStrategy } from './strategy';

// Guards
import { JwtRefreshGuard } from './guard';
import { AuthGuard } from './guard/auth.guard';

//Controllers
import { AuthController } from './controller';

@Module({
  imports: [UserModule, AuthRefreshTokenModule],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    AuthService,
    JwtRefreshGuard,
    JwtRefreshTokenStrategy,
    JwtService,
    AuthGuard,
  ],
})
export class AuthModule {}
