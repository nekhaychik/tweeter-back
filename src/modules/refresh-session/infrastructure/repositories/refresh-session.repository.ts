import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

// Interfaces
import { RefreshSessionDto } from '../entities';
import {
  AddRefreshSessionParameters,
  GetCountOfUserActiveSessionsParameters,
  RemoveRefreshSessionParameteres,
  _AddRefreshSessionParameters,
  _IsValidSessionsCountParameters,
  WipeAllUserRefreshSessionsParameters,
  _WipeOldestUserRefreshSessionParameters,
} from '../repository-interfaces';

@Injectable()
export class RefreshSessionRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  public async addRefreshSession({
    refreshSession,
  }: AddRefreshSessionParameters): Promise<void> {
    if (await this._isValidSessionsCount({ userId: refreshSession.userId })) {
      await this._addRefreshSession({ refreshSession });
    } else {
      await this._wipeOldestUserRefreshSession({
        userId: refreshSession.userId,
      });

      await this._addRefreshSession({ refreshSession });
    }
  }

  public async _isValidSessionsCount({
    userId,
  }: _IsValidSessionsCountParameters): Promise<boolean> {
    const existingSessions: RefreshSessionDto[] = await this.cacheService.get(
      userId,
    );

    if (!existingSessions) {
      return true;
    }

    return existingSessions.length < +process.env.MAX_REFRESH_SESSIONS_COUNT;
  }

  public async _addRefreshSession({
    refreshSession,
  }: _AddRefreshSessionParameters): Promise<void> {
    const cachedData: RefreshSessionDto[] = await this.cacheService.get(
      refreshSession.userId,
    );

    if (!cachedData) {
      await this.cacheService.set(refreshSession.userId, [refreshSession]);
    } else {
      cachedData.push(refreshSession);

      await this.cacheService.set(refreshSession.userId, cachedData);
    }
  }

  public async getCountOfUserActiveSessions({
    userId,
  }: GetCountOfUserActiveSessionsParameters): Promise<number> {
    const userRefreshSessions: RefreshSessionDto[] =
      await this.cacheService.get(userId);

    return !!userRefreshSessions.length ? userRefreshSessions.length : 0;
  }

  public async removeRefreshSession({
    refreshToken,
    userId,
  }: RemoveRefreshSessionParameteres): Promise<void> {
    const userSessions: RefreshSessionDto[] = await this.cacheService.get(
      userId,
    );

    let currentRefreshTokenIndex: number;

    if (userSessions)
      currentRefreshTokenIndex = userSessions.findIndex(
        (session) => session.refreshToken === refreshToken,
      );

    userSessions.splice(currentRefreshTokenIndex, 1);

    if (userSessions.length) {
      await this.cacheService.set(userId, userSessions);
    }
  }

  public async deleteAllUserRefreshSessions({
    userId,
  }: WipeAllUserRefreshSessionsParameters): Promise<void> {
    await this.cacheService.del(userId);
  }

  public async _wipeOldestUserRefreshSession({
    userId,
  }: _WipeOldestUserRefreshSessionParameters): Promise<void> {
    const cachedData: RefreshSessionDto[] = await this.cacheService.get(userId);

    cachedData.shift();

    await this.cacheService.set(userId, cachedData);
  }
}
