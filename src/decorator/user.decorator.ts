import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 自定义装饰器;
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return data ? data : user;
  },
);
