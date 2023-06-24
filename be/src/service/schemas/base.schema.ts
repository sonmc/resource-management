import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @CreateDateColumn()
    created_at: Date = new Date();

    @UpdateDateColumn()
    updated_at: Date = new Date();
}
