import { ApiProperty } from '@nestjs/swagger';

export class AuthPresenter {
  @ApiProperty()
  username: string;
  roles: string[];
  permissions: string[];
}
