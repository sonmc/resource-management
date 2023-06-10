import { Column, Entity, ManyToOne } from "typeorm";

import { BaseSchema } from "./base.schema";
import { UserSchema } from "./user.schema";

@Entity({ name: "news" })
export class NewSchema extends BaseSchema {
  @Column()
  content: string = "";

  @Column()
  title: string = "";

  @Column({
    nullable: true,
  })
  image: string = "";

  @ManyToOne(() => UserSchema, (user) => user.news)
  user: UserSchema = new UserSchema();
}
