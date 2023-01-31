import { Injectable } from '@nestjs/common';
import { RefreshSessionRepository } from '../infrastructure/repositories';

// Interfaces
import {
  DeleteAllUserSessionsParameters,
  DeleteUserRefreshSessionParameters,
  GetCountOfUserActiveSessionsParameters,
} from './refresh-session-domain.type';

@Injectable()
export class RefreshSessionDomain {
  constructor(
    private readonly refreshSessionRepository: RefreshSessionRepository,
  ) {}

  public async verifyRefreshSession(oldRefreshSession, newFingerprint) {
    const nowTime = new Date().getTime();

    if (nowTime > oldRefreshSession.expiresIn) {
      throw new Error('SESSION_EXPIRED_ERROR');
    }

    if (oldRefreshSession.fingerprint !== newFingerprint) {
      throw new Error('INVALID_REFRESH_SESSION');
    }
  }

  public async getCountOfUserActiveSessions({
    userId,
  }: GetCountOfUserActiveSessionsParameters): Promise<number> {
    return await this.refreshSessionRepository.getCountOfUserActiveSessions({
      userId,
    });
  }

  public async deleteAllUserSessions({
    userId,
  }: DeleteAllUserSessionsParameters): Promise<void> {
    await this.refreshSessionRepository.deleteAllUserRefreshSessions({
      userId,
    });
  }

  public async deleteUserRefreshSession({
    userId,
    refreshToken,
  }: DeleteUserRefreshSessionParameters): Promise<void> {
    await this.refreshSessionRepository.removeRefreshSession({
      refreshToken,
      userId,
    });
  }
}
