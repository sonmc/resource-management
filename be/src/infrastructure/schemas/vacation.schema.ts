import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'vacations' })
export class Vacation extends BaseEntity {
  @Column()
  reason: string;

  @Column()
  start: Date;
  @Column()
  end: Date;

  @ManyToMany(() => User, (users) => users.vacations)
  @JoinTable({
    name: 'users_vacations',
    joinColumn: { name: 'vacation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
