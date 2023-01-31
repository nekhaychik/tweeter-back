import { Injectable } from '@nestjs/common';

// Domains
import { RefreshSessionDomain } from '../domain';

// Interfaces
import {
  DeleteAllUserSessionsParameters,
  DeleteUserRefreshSessionParameters,
  GetCountOfUserActiveSessionsParameters,
} from './refresh-session-service.type';

@Injectable()
export class RefreshSessionService {
  constructor(private readonly refreshSessionDomain: RefreshSessionDomain) {}

  public async getCountOfUserActiveSessions({
    userId,
  }: GetCountOfUserActiveSessionsParameters): Promise<number> {
    try {
      return await this.refreshSessionDomain.getCountOfUserActiveSessions({
        userId,
      });
    } catch (err) {
      throw err;
    }
  }

  public async deleteAllUserSessions({
    userId,
  }: DeleteAllUserSessionsParameters): Promise<void> {
    try {
      await this.refreshSessionDomain.deleteAllUserSessions({ userId });
    } catch (err) {
      throw err;
    }
  }

  public async deleteUserRefreshSession({
    userId,
    refreshToken,
  }: DeleteUserRefreshSessionParameters): Promise<void> {
    try {
      await this.refreshSessionDomain.deleteUserRefreshSession({
        userId,
        refreshToken,
      });
    } catch (err) {
      throw err;
    }
  }
}
