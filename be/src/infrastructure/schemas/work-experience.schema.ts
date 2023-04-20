import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Candidate } from './candidate.schema';

@Entity({ name: 'work_experiences' })
export class WorkExperience extends BaseEntity {
    @Column({ nullable: true })
    company_name: string;
    @Column({ nullable: true })
    role_name: string;
    @Column({ nullable: true })
    description: string;
    @Column({ nullable: true })
    date_start: Date;
    @Column({ nullable: true })
    date_end: string;
    @ManyToOne(() => Candidate, (can) => can.educations)
    candidate: Candidate;
}
