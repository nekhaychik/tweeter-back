import { Injectable } from '@nestjs/common';
import { RefreshSessionRepository } from '../infrastructure/repositories';

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
}
