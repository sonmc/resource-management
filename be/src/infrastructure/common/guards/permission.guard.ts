import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import RequestWithUser from 'src/domain/adapters/request-with-user.interface';
import { PERMISSION_KEY } from 'src/infrastructure/decorators/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(PERMISSION_KEY, context.getHandler());
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const res = permissions.some((name) => user.permissions.includes(name));
    return res;
  }
}
