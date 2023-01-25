import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from 'src/core';

// Decorators
import { CurrentUserArgs } from 'src/core/decorators';

// Services
import { AuthService } from '../application';
import { AuthGuard } from '../guard';
import { SignInInput, SignUpInput, SignUpVerifyInput } from './inputs';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() body: SignUpInput): Promise<any> {
    const { email, password } = body;

    return await this.authService.signUp({ email, password });
  }

  @Post('sign-up-verify')
  public async signUpVerify(
    @Body() body: SignUpVerifyInput,
    @Req() request: Request,
  ) {
    const { email, emailCode } = body;

    const result = await this.authService.signUpVerify({ email, emailCode });

    request.res.setHeader('Set-Cookie', [
      result.accessTokenCookie,
      result.refreshTokenCookie.cookie,
    ]);

    return result;
  }

  @Post('sign-in')
  public async signIn(@Body() body: SignInInput) {
    const { email, password } = body;

    return await this.authService.signIn({ email, password });
  }

  @UseGuards(AuthGuard)
  @Post('sign-out')
  public async signOut(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Req() request: Request,
  ) {
    const { email } = currentUser;

    await this.authService.signOut({ email });

    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
