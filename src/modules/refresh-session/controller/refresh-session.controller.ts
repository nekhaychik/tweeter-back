import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

// Guard
import { AuthGuard } from '../../auth/guard';

// Services
import { RefreshSessionService } from '../application';

// Interfaces
import { CurrentUser, CurrentUserArgs } from 'src/core';

@UseGuards(AuthGuard)
@Controller('refresh-session')
export class RefreshSessionController {
  constructor(private readonly refreshSessionService: RefreshSessionService) {}

  @Get('my-active-sessions')
  public async getCountOfMyActiveSessions(
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<{ userId: string; amountOfActiveSessions: number }> {
    const { userId } = currentUser;

    const result = {
      userId,
      amountOfActiveSessions:
        await this.refreshSessionService.getCountOfUserActiveSessions({
          userId,
        }),
    };

    return result;
  }

  @Delete('all-sessions')
  public async deleteAllMySessions(
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<{ result: string }> {
    const { userId } = currentUser;

    await this.refreshSessionService.deleteAllUserSessions({ userId });

    return {
      result: 'All users active sessions were successfully deleted',
    };
  }

  @Delete('/:refreshToken')
  public async deleteRefreshSession(
    @Param() params: { refreshToken: string },
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<{ result: string }> {
    const { refreshToken } = params;
    const { userId } = currentUser;

    await this.refreshSessionService.deleteUserRefreshSession({
      userId,
      refreshToken,
    });

    return {
      result: 'Selectes refresh session was successfully deleted',
    };
  }
}
