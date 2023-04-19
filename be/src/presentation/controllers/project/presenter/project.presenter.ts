import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/domain/entities/user.entity';

export class ProjectPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    note: string;
    @ApiProperty()
    project_leader: number;
    users: UserEntity[] = [];
}
