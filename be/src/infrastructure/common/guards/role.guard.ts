import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import RequestWithUser from 'src/domain/adapters/request-with-user.interface';
import { Role } from 'src/domain/enums/role.enum';
import { ROLES_KEY } from 'src/infrastructure/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const res = true; // roles.some((roleId) => user.roles.id == roleId);
    return res;
  }
}
