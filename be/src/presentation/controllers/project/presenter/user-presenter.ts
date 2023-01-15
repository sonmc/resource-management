import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { WorkloadEntity } from 'src/domain/entities/workload.entity';

export class UserPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone_number: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    gender: boolean;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    dob: Date;
    @ApiProperty()
    role: RoleEntity;
    @ApiProperty()
    workloads: WorkloadEntity[];
}
