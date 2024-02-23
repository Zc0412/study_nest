import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../decorator/roles.decorator';
import { request } from 'express';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    // 方式一
    // const roles = this.reflector.get(Roles, context.getHandler());
    // if (roles) {
    //   return true;
    // } else {
    //   return true;
    // }
    // const req = context.switchToHttp().getRequest();
    // const user = req.user;
    //
    // return matchRoles(roles, user.roles);
    // 授权
    //   所需角色
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    console.log(req.user);
    // 校验user是否存在所需角色中
    return requiredRoles.some((role) => req?.user?.roles?.includes(role));
  }
}
