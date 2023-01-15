import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_projects' })
export class UserProject {
    @Column()
    @PrimaryColumn()
    project_id: Number;

    @Column()
    @PrimaryColumn()
    user_id: Number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;
}
