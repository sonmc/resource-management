import { Column, Entity, JoinTable, ManyToMany, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './base.schema';
import { User } from './user.schema';
import { KanbanColumn } from './kanban_column.schema';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  status: number;

  @Column()
  estimated_start: number;

  @Column()
  estimated_end: number;

  @Column()
  index: number;

  @ManyToOne(() => KanbanColumn, (p) => p.tasks)
  kanban_column: KanbanColumn;

  @ManyToMany(() => User, (users) => users.projects)
  @JoinTable({
    name: 'users_tasks',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
