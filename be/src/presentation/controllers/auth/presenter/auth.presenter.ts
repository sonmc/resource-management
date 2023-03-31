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
    roles: string[];
    permissions: string[];
    projects: string[];
}
