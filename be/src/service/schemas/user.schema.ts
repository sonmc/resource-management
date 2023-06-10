import { Entity, Column, Index, ManyToMany, JoinTable, BeforeInsert, OneToMany } from 'typeorm';

import { BaseSchema } from './base.schema';
import { RoleSchema } from './role.schema';
import { hash } from '../../util/bcrypt.util';
import { NewSchema } from './new.schema';
import { VacationSchema } from './vacation.schema';

@Entity({ name: 'user' })
export class UserSchema extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = '';

    @Column({ nullable: true })
    full_name: string = '';

    @Column({ nullable: true })
    nick_name: string = '';

    @Column({ nullable: true })
    email: string = '';

    @Column({ nullable: true })
    phone_number: string = '';

    @Column()
    password: string = '';

    @Column()
    status: number = 0;

    @Column()
    gender: boolean = false;

    @Column({ nullable: true })
    avatar: string = '';

    @Column({ nullable: true })
    dob: Date = new Date();

    @Column({ nullable: true })
    address: string = '';

    @Column({ nullable: true })
    introduce: string = '';

    @Column()
    onboarding: Date = new Date();

    @Column()
    status_level: string = '';

    @Column({ nullable: true })
    chapterHead: number = 0;

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await hash(password || this.password);
    }

    @OneToMany(() => NewSchema, (n) => n.user, {
        eager: true,
    })
    news: NewSchema[] | undefined;

    @OneToMany(() => VacationSchema, (vacation) => vacation.user, {
        eager: true,
    })
    vacations: VacationSchema[] | undefined;

    @ManyToMany(() => RoleSchema, (role) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: RoleSchema[] | undefined;

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';
}
