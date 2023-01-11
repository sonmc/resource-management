import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_projects' })
export class UserProject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_id: number;

    @Column()
    user_id: number;
}
