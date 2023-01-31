import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const PrivacyInfoArgs = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    return {
      ipAdress: request.socket.remoteAddress,
      userAgent: request.headers['user-agent'],
    };
  },
);
