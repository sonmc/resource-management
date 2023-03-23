import { ApiProperty } from '@nestjs/swagger';

export class ProjectFilterPresenter {
    @ApiProperty()
    name: string;
    @ApiProperty()
    start_date: Date;
    @ApiProperty()
    end_date: Date;
}
