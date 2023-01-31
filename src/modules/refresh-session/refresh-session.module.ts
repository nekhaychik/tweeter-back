import { Module } from '@nestjs/common';

// Services
import { RefreshSessionService } from './application';

// Domains
import { RefreshSessionDomain } from './domain/refresh-session.domain';

// Controllers
import { RefreshSessionController } from './controller';

// Infrastructure
import { RefreshSessionRepository } from './infrastructure';

@Module({
  imports: [],
  controllers: [RefreshSessionController],
  exports: [
    RefreshSessionDomain,
    RefreshSessionRepository,
    RefreshSessionService,
  ],
  providers: [
    RefreshSessionRepository,
    RefreshSessionDomain,
    RefreshSessionService,
  ],
})
export class RefreshSessionModule {}
