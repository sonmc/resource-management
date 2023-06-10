import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseSchema } from "./base.schema";
import { UserSchema } from "./user.schema";

@Entity({ name: "lunch_orders" })
export class LunchOrderSchema extends BaseSchema {
  @Column({
    type: "json",
    nullable: true,
  })
  lunch_calendars: string = "";

  @OneToOne(() => UserSchema)
  @JoinColumn()
  user: UserSchema = new UserSchema();
}
