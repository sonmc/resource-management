import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Education } from './education.schema';
import { WorkExperience } from './work-experience.schema';
import { CvProject } from './cv-project.schema';
import { CvSkill } from './cv-skill.schema';
@Entity({ name: 'candidates' })
export class Candidate extends BaseEntity {
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: true })
    email: string;
    @Column({ nullable: true })
    phone_number: string;
    @Column({ nullable: true })
    position: string;
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
    address: string;

    @OneToMany(() => Education, (edu) => edu.candidate, {
        eager: true,
    })
    educations: Education[];

    @OneToMany(() => WorkExperience, (edu) => edu.candidate, {
        eager: true,
    })
    work_experiences: WorkExperience[];

    @OneToMany(() => CvProject, (edu) => edu.candidate, {
        eager: true,
    })
    projects: CvProject[];

    @OneToOne(() => CvSkill)
    @JoinColumn()
    cv_skill: CvSkill;
}
