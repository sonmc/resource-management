import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Role } from "src/modules/role/entities/role.entity";

export class CreateUserDto {
    @IsNotEmpty()
    role_id: number;
    dob: Date;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    phone_pumber: string;
    status: number;
    avatar: string;
    gender: boolean;
    role: Role;
}
