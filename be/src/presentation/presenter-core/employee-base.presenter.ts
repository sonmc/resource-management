import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { RoleEntity } from 'src/domain/entities/role.entity';
export class EmployeeBasePresenter {
  id: number;
  dob: Date;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  phone_number: string;
  status: number;
  avatar: string;
  gender: boolean;
  roles: RoleEntity[];
}
