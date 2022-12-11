export class CreateUserDto {
    roleId: string;
    dob: Date;
    name: string;
    email: string;
    phoneNumber: string;
    status: number;
    avatar: string;
    gender: boolean;
}
