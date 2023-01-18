import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthenticationService } from '../application';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  public async signUp(@Body() body) {
    const { email, password } = body;
    const data = await this.authService.signUp({ email, password });

    return data;
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

  @Post('sign-out')
  public async signOut(@Body() body, @Req() request) {
    const { email } = body;

    await this.authService.signOut({ email });

    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
