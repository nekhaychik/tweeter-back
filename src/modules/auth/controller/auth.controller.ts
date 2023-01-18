import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';

// Services
import { AuthService } from '../application';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() body) {
    const { email, password } = body;
    return await this.authService.signUp({ email, password });
  }

  @Post('sign-up-verify')
  public async signUpVerify(@Body() body, @Req() request) {
    const { email, emailCode } = body;
    const result = await this.authService.signUpVerify({ email, emailCode });

    request.res.setHeader('Set-Cookie', [
      result.accessTokenCookie,
      result.refreshTokenCookie,
    ]);

    return result;
  }

  @Post('sign-in')
  public async signIn(@Body() body) {
    const { email, password } = body;

    return await this.authService.signIn({ email, password });
  }

  @Post('sign-out')
  public async signOut(@Body() body, @Req() request) {
    const { email } = body;

    await this.authService.signOut({ email });

    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
