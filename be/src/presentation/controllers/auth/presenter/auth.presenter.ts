import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/domain/entities/user.entity';
import { RoleEntity } from 'src/domain/entities/role.entity';

export class AuthPresenter {
  @ApiProperty()
  username: string;
  role: RoleEntity;
  constructor(userModel: UserWithoutPassword) {
    this.username = userModel.username;
    this.role = userModel.role;
  }
}
