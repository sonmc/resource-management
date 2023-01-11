import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_projects' })
export class UserProject {
    @Column()
    @PrimaryColumn()
    project_id: number;

    @Column()
    @PrimaryColumn()
    user_id: number;
}
