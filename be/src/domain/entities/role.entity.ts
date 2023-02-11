import { Permission } from 'src/infrastructure/schemas/permission.schema';

export class RoleEntity {
  id: number;
  name: string;
  permissions: Permission[];
  description?: string;
}
