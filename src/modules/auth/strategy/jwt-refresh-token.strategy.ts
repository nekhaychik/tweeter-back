import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

// Services
import { UserEntity, UserService } from 'src/modules/user';

// Interfaces
import { ValidateParameters } from './strategy.interfaces';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  public async validate({
    request,
    payload,
  }: ValidateParameters): Promise<UserEntity> {
    const refreshToken = request.cookies?.Refresh;

    return await this.userService.getUserIfRefreshTokenMatches({
      refreshToken,
      email: payload.email,
    });
  }
}
