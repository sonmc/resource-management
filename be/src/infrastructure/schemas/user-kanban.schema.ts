import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_kanbans' })
export class UserKanban {
  @Column()
  @PrimaryColumn()
  kanban_id: Number;

  @Column()
  @PrimaryColumn()
  user_id: Number;

  @Column()
  joined_date: Date;

  @Column()
  user_shared: number;
}
