import { ApiProperty } from '@nestjs/swagger';

export class AuthPresenter {
    @ApiProperty()
    id: string;
    username: string;
    avatar: string;
    full_name: string;
    last_name: string;
    first_name: string;
    nick_name: string;
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
