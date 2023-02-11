import { ADMIN_ID } from './../business-rules/role.rule';
import { RoleEntity } from 'src/domain/entities/role.entity';

export function convertPermissions(roles: RoleEntity[]): string[] {
  let permissions = [];
  roles.forEach((role) => {
    permissions = permissions.concat(role.permissions.map((per) => per.name));
  });
  return permissions;
}

export function convertRoles(roles: RoleEntity[]): string[] {
  const result = roles.map((r) => r.name);
  return result;
}

export function isAdmin(roles: RoleEntity[]): boolean {
  const role = roles.find((x) => x.id == ADMIN_ID);
  return role != null;
}
