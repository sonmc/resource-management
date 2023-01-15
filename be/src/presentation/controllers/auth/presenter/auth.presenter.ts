import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPassword } from 'src/domain/entities/user.entity';

export class AuthPresenter {
    @ApiProperty()
    username: string;

    constructor(userModel: UserWithoutPassword) {
        this.username = userModel.username;
    }
}
