import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RouteSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    path: string = '';
}
