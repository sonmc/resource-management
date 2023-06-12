import { BeforeInsert, Column, Entity, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import { BaseSchema } from './base.schema';
import { RoleSchema } from './role.schema';
import { VacationSchema } from './vacation.schema';
import { NewSchema } from './new.schema';
import { hash } from 'utils/bcrypt.util';

@Entity({ name: 'users' })
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

    @Column()
    dob: Date = new Date();

    @Column()
    address: string = '';

    @Column({ nullable: true })
    introduce: string = '';

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';

    @Column()
    onboarding?: Date;

    @Column()
    status_level?: string;

    @Column({ nullable: true })
    chapterHead?: number;

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await hash(password || this.password);
    }

    @OneToMany(() => NewSchema, (n) => n.user, {
        eager: true,
    })
    news?: NewSchema[];

    @OneToMany(() => VacationSchema, (vacation) => vacation.user, {
        eager: true,
    })
    vacations?: VacationSchema[];

    @ManyToMany(() => RoleSchema, (role: RoleSchema) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles?: RoleSchema[];
}
