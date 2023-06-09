import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_roles' })
export class UserRole {
    @Column()
    @PrimaryColumn()
    role_id: Number;

    @Column()
    @PrimaryColumn()
    user_id: Number;

    constructor(role_id: number, user_id: number) {
        this.role_id = role_id;
        this.user_id = user_id;
    }
}
