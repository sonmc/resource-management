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
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    status: number;
    avatar: string;
    gender: boolean;
    roles: RoleEntity[];
    constructor() {
        this.full_name = this.first_name + ' ' + this.last_name;
    }
}
