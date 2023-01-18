import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Modules
import { UserModule } from '../user';

// Services
import { AuthService } from './application';
import { JwtRefreshGuard } from './guard';
import { JwtRefreshTokenStrategy } from './strategy';

//Controllers
import { AuthController } from './controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    AuthService,
    JwtRefreshGuard,
    JwtRefreshTokenStrategy,
    JwtService,
  ],
})
export class AuthModule {}
