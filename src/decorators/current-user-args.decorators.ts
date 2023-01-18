import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserArgs = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp().getRequest();

    return ctx.currentUser;
  },
);
