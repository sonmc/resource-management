import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/domain/entities/user.entity';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { PermissionEntity } from 'src/domain/entities/permission.entity';

export class AuthPresenter {
  @ApiProperty()
  username: string;
  roles: RoleEntity;
  permissions: string[];
  constructor(userModel: UserWithoutPassword) {
    this.username = userModel.username;
    this.roles = userModel.roles;
    this.permissions = userModel.permissions;
  }
}
