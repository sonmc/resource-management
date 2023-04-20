import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Candidate } from './candidate.schema';

@Entity({ name: 'educations' })
export class Education extends BaseEntity {
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    description: string;
    @Column({ nullable: true })
    date_start: Date;
    @Column({ nullable: true })
    date_end: Date;
    @ManyToOne(() => Candidate, (can) => can.educations)
    candidate: Candidate;
}
