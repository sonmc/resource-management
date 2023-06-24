import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'departments_users' })
export class DepartmentUserSchema {
    @Column()
    @PrimaryColumn()
    department_id: Number = 0;

    @Column()
    @PrimaryColumn()
    user_id: Number = 0;

    @Column()
    is_admin: boolean = false;
}
