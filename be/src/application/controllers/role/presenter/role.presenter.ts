import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/domain/entities/role.entity';

export class RolePresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;

    constructor(role: RoleEntity) {
        this.id = role.id;
        this.name = role.name;
    }
}
