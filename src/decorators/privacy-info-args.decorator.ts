import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PrivacyInfoArgs = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp().getRequest();
    const { ipAdress, userAgent } = ctx;

    return {
      ipAdress,
      userAgent,
    };
  },
);
