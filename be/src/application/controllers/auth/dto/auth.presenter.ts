import { ApiProperty } from "@nestjs/swagger";
import { UserWithoutPassword } from "src/domain/model/user";

export class AuthPresenter {
  @ApiProperty()
  username: string;

  constructor(userModel: UserWithoutPassword) {
    this.username = userModel.username;
  }
}
