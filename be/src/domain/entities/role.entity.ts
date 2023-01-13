import { Role } from 'src/infrastructure/schemas/role.schema';

export class RoleEntity {
    id: number;
    name: string;
    constructor(role: Role) {
        this.id = role.id;
        this.name = role.name;
    }
}
