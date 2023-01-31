import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Decorators
import { CurrentUserArgs, PrivacyInfoArgs } from 'src/core/decorators';

// Interfaces
import { CurrentUser, PrivacyInfo } from 'src/core';
import { SignInInput, SignUpInput, SignUpVerifyInput } from './inputs';

// Services
import { AuthService } from '../application';

// Guard
import { AuthGuard } from '../guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() body: SignUpInput): Promise<any> {
    const { email, username, password } = body;

    return await this.authService.signUp({ email, username, password });
  }

  @Post('sign-up-verify')
  public async signUpVerify(
    @Body() body: SignUpVerifyInput,
    @PrivacyInfoArgs() privacyInfo: PrivacyInfo,
    @Req() request,
  ) {
    const { email, emailCode } = body;

    const result = await this.authService.signUpVerify({
      email,
      emailCode,
      privacyInfo,
      fingerprint: request.fingerprint,
    });

    request.res.cookie(result.cookies[0].name, result.cookies[0].value);

    return result;
  }

  @Post('sign-in')
  public async signIn(
    @Body() body: SignInInput,
    @PrivacyInfoArgs() privacyInfo: PrivacyInfo,
    @Req() request,
  ) {
    const { email, password } = body;

    const result = await this.authService.signIn({
      email,
      password,
      privacyInfo,
      fingerprint: request.fingerprint,
    });

    request.res.cookie(result.cookies[0].name, result.cookies[0].value);

    return result;
  }

  @UseGuards(AuthGuard)
  @Post('sign-out')
  public async signOut(
    @CurrentUserArgs() currentUser: CurrentUser,
    @Req() request,
  ) {
    const { userId } = currentUser;
    const { cookies } = request;

    const result = await this.authService.signOut({ userId, cookies });

    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());

    return result;
  }
}
