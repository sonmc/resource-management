import { ApiProperty } from '@nestjs/swagger';

export class RoleBasePresenter {
    @ApiProperty()
    id?: number = 0;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description?: string = '';
}
