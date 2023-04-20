import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'candidates' })
export class Candidate extends BaseEntity {
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    email: string;
    @Column({ nullable: true })
    phone_number: string;
    @Column({ nullable: true })
    skill: string;
    @Column({ nullable: true })
    avatar: string;
    @Column()
    isInterview: boolean;
    @Column({ nullable: true })
    interview_by: number;
    @Column({ nullable: true })
    interview_date: Date;
    @Column()
    cv_file_path: string;
    @Column()
    cv_file_name: string;
    @Column({ nullable: true })
    notes: string;
    @Column()
    address:string;
}
