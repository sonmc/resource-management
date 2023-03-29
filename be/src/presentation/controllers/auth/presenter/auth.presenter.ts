import { ApiProperty } from '@nestjs/swagger';

export class AuthPresenter {
    @ApiProperty()
    username: string;
    avatar: string;
    id: number;
    full_name: string;
    last_name: string;
    first_name: string;
    roles: string[];
    permissions: string[];
}
