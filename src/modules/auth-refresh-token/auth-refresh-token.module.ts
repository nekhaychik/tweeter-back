import { Module } from '@nestjs/common';

import { RefreshSessionDomain } from './domain/refresh-session.domain';
import { RefreshSessionRepository } from './infrastructure/repositories';

@Module({
  imports: [],
  controllers: [],
  exports: [RefreshSessionDomain, RefreshSessionRepository],
  providers: [RefreshSessionRepository, RefreshSessionDomain],
})
export class AuthRefreshTokenModule {}
