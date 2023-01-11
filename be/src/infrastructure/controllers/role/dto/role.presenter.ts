import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from 'src/domain/model/role';

export class RolePresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    content: string;

    constructor(role: RoleModel) {
        this.id = role.id;
        this.content = role.content;
    }
}
