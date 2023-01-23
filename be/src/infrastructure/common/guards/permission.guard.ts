import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const userPermissions = req?.user?.permissions || [];
    const handle = context.getHandler();
    const requiredPermissions = this.reflector.get('permissions', handle) || [];
    const hasAllRequiredPermissions = requiredPermissions.every((permission) => userPermissions.includes(permission));
    if (requiredPermissions.length === 0 || hasAllRequiredPermissions) {
      return true;
    }
    throw new ForbiddenException('Insufficient permissions');
  }
}
