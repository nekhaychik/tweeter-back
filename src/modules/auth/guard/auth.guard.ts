import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// Interfaces
import { CurrentUser } from 'src/core';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const { currentUser }: { currentUser: CurrentUser } = context
      .switchToHttp()
      .getRequest();

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
