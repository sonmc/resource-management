import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'candidates' })
export class Candidate extends BaseEntity {
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    introduce: string;
    @Column({ nullable: true })
    email: string;
    @Column({ nullable: true })
    phone_number: string;
    @Column({ nullable: true })
    position: string;
    @Column({ nullable: true })
    avatar: string;
    @Column({ nullable: true })
    dob: Date;
    @Column({ nullable: true })
    gender: string;
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

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    educations: string;

    @Column({ nullable: true })
    work_experiences: string;

    @Column({ nullable: true })
    projects: string;

    @Column({ nullable: true })
    cv_skill: string;

    @Column({ nullable: true })
    certificates: string;
}
