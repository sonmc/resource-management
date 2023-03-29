import { ApiProperty } from '@nestjs/swagger';

export class RolePemsPresenter {
    @ApiProperty()
    role_id: number;
    @ApiProperty()
    permission_id: number;
}
