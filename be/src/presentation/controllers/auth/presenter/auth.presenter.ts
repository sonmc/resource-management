import { ApiProperty } from '@nestjs/swagger';

export class AuthPresenter {
    @ApiProperty()
    user_id: string;
    username: string;
    avatar: string;
    id: number;
    full_name: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    email: string;
    address: string;
    introduce: string;
    onboarding: string;
    roles: string[];
    role_ids: number[];
    permissions: string[];
    projects: string[];
}
