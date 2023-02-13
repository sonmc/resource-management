import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_tasks' })
export class UserTask {
  @Column()
  @PrimaryColumn()
  task_id: Number;

  @Column()
  @PrimaryColumn()
  user_id: Number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}
