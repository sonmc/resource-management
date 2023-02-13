import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { convertPermissions, isAdmin } from 'src/actions/auth.action';
import RequestWithUser from 'src/domain/adapters/request-with-user.interface';
import { PERMISSION_KEY } from 'src/infrastructure/decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    let result = isAdmin(user.roles);
    if (!result) {
      const permissions = this.reflector.get<string[]>(PERMISSION_KEY, context.getHandler());
      if (!permissions) {
        return true;
      }
      const userPermissions = convertPermissions(user.roles);
      result = permissions.some((name) => userPermissions.includes(name));
    }
    return result;
  }
}