import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'cv-skills' })
export class CvSkill extends BaseEntity {
    @Column({ nullable: true })
    technical_abilities: string;
    @Column({ nullable: true })
    languages: string;
    @Column({ nullable: true })
    work_method: string;
    @Column({ nullable: true })
    description: string;
}
