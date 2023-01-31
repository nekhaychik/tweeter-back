import { Module } from '@nestjs/common';

// Modules
import { UserModule } from '../user';
import { RefreshSessionModule } from '../refresh-session';

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
  imports: [UserModule, RefreshSessionModule],
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
