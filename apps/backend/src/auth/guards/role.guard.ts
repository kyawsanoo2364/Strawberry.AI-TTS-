import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role, ROLES_KEY } from '../decorators/role.decorator';

export class RoleGuard implements CanActivate {
  constructor(@Inject() private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No user found in request');
    }
    const userHasRole = requiredRoles.some(
      (role) => (user.role as string)?.toUpperCase() === role,
    );
    if (!userHasRole) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
