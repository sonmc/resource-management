import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 255, nullable: true })
    content: string;

    @Column('boolean', { default: false })
    is_done: boolean;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}
